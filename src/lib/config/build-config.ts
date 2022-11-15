/**
 * There are a few any usages in this file - mainly to deal with co/contra-variance
 * issues that aren't actual runtime issues, but enable the creation of a nicer API
 * surface for this module
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

interface ValidationSuccess<T> {
  isValid: true;
  value: T;
}

interface ValidationFailure {
  isValid: false;
  message: string;
  envVar: string;
}

type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

interface Reporters<T> {
  valid: () => ValidationSuccess<T>;
  invalid: (message: string) => ValidationFailure;
}

type Validator<T> = (value: T, reporters: Reporters<T>) => ValidationResult<T>;

type Coercer<T, U = string> = (a: U) => T;

const required =
  (report: (a: ValidationResult<Any>) => Any, env: NodeJS.ProcessEnv) =>
  <T = string>(
    envVar: string,
    {
      coerce = (a: string) => a as Any,
      validate = (_value, { valid }) => valid(),
    }: {
      coerce?: Coercer<T>;
      validate?: Validator<T>;
    } = {},
  ): T => {
    try {
      const value = env[envVar];

      if (value === null || typeof value === "undefined") {
        return report({
          isValid: false,
          message: "Not defined",
          envVar,
        });
      }

      const coerced = coerce(value);

      return report(
        validate(coerced, {
          valid: () => ({ isValid: true, value: coerced }),
          invalid: (message) => ({
            isValid: false,
            message,
            envVar,
          }),
        }),
      );
    } catch (err) {
      return report({
        isValid: false,
        envVar,
        message: err.message,
      });
    }
  };

const optional =
  (report: (a: ValidationResult<Any>) => Any, env: NodeJS.ProcessEnv) =>
  <T = string>(
    envVar: string,
    {
      coerce = (a: string | undefined) => a as Any,
      validate = (_value, { valid }) => valid(),
    }: {
      coerce?: Coercer<T | undefined, string | undefined>;
      validate?: Validator<T | undefined>;
    } = {},
  ): T | undefined => {
    try {
      const value = env[envVar];

      const coerced = coerce(value);

      return report(
        validate(coerced, {
          valid: () => ({ isValid: true, value: coerced }),
          invalid: (message) => ({
            isValid: false,
            message,
            envVar,
          }),
        }),
      );
    } catch (err) {
      return report({
        isValid: false,
        envVar,
        message: err.message,
      });
    }
  };

const SECTION_MARKER = "___SECTION___";

const section =
  (report: (a: ValidationResult<Any>) => Any, env: NodeJS.ProcessEnv) =>
  <T>(s: F<NodeJS.ProcessEnv, T>): T => {
    try {
      const value = s(env);

      return report({
        isValid: true,
        value,
      });
    } catch (err) {
      return report({
        isValid: false,
        envVar: SECTION_MARKER,
        message: err.message,
      });
    }
  };

type F<T, U> = (a: T) => U;

interface BuildArgs {
  required: ReturnType<typeof required>;
  optional: ReturnType<typeof optional>;
  coerce: {
    number: (value: string) => number;
    bool: (value: string | undefined) => boolean;
  };
  validate: {
    number: Validator<number>;
  };
  section: <T>(s: F<NodeJS.ProcessEnv, T>) => T;
}

interface WholeConfigValidationSuccess {
  isValid: true;
}

interface WholeConfigValidationFailure {
  isValid: false;
  message: string;
}

type WholeConfigValidationResult =
  | WholeConfigValidationSuccess
  | WholeConfigValidationFailure;

interface WholeConfigReporters {
  valid: () => WholeConfigValidationSuccess;
  invalid: (message: string) => WholeConfigValidationFailure;
}

type ConfigValidator<T> = (
  config: T,
  reporters: WholeConfigReporters,
) => WholeConfigValidationResult;

type Builder<T> = (b: BuildArgs) => T;

export const buildConfig =
  <T>(
    builder: Builder<T>,
    ...wholeConfigValidators: Array<ConfigValidator<T>>
  ) =>
  (env = process.env): T => {
    const validations: ValidationResult<Any>[] = [];

    const reporter = (result: ValidationResult<Any>) => {
      validations.push(result);
      if (result.isValid) {
        return result.value;
      }
    };

    const result = builder({
      required: required(reporter, env),
      optional: optional(reporter, env),
      coerce: {
        number: (value) => Number(value),
        bool: (value) => value?.toLowerCase() === "true",
      },
      validate: {
        number: (value, { valid, invalid }) => {
          if (isNaN(value)) {
            return invalid("Must be a valid number");
          }

          return valid();
        },
      },
      section: section(reporter, env),
    });

    const errs = validations.filter((v) => !v.isValid) as ValidationFailure[];

    if (errs.length > 0) {
      throw new Error(
        `Invalid config
${errs
  .map(({ envVar, message }) => {
    const part =
      envVar === SECTION_MARKER ? "a section of config" : `"${envVar}"`;
    return `Validating ${part} failed with message "${message}"`;
  })
  .join("\r\n")}`,
      );
    }

    const wholeConfigValidations = wholeConfigValidators.map(
      (wholeConfigValidator) =>
        wholeConfigValidator(result, {
          valid: () => ({ isValid: true, value: result }),
          invalid: (message: string) => ({ isValid: false, message }),
        }),
    );

    const wholeConfigErrs = wholeConfigValidations.filter(
      (v) => !v.isValid,
    ) as WholeConfigValidationFailure[];

    if (wholeConfigErrs.length > 0) {
      throw new Error(
        `Invalid config
${wholeConfigErrs
  .map(
    ({ message }) => `Validating built config failed with message "${message}"`,
  )
  .join("\r\n")}`,
      );
    }

    return result;
  };
