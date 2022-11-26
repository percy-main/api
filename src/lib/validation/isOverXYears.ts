import { registerDecorator, ValidationOptions } from "class-validator";
import dayjs, { Dayjs } from "dayjs";

export function IsOverXYearsAgo(
  years: number,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isOverXYearsAgo",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message:
          validationOptions?.message ||
          `${propertyName} must be at least ${years} years ago`,
      },
      validator: {
        validate(value: Dayjs) {
          return dayjs().diff(value, "year") > years;
        },
      },
    });
  };
}
