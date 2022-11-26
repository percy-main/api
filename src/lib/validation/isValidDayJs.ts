import { registerDecorator, ValidationOptions } from "class-validator";
import { Dayjs } from "dayjs";

export function IsValidDayJs(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidDayJs",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message:
          validationOptions?.message || `${propertyName} must be a valid date`,
      },
      validator: {
        validate(value: Dayjs) {
          return value.isValid();
        },
      },
    });
  };
}
