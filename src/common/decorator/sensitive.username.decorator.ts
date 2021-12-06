import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { reservedUsernames } from '../reserved-usernames';

export function SensitiveUsername(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: RegexConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'SensitiveUsername' })
export class RegexConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue: string = (args.object as any)[relatedPropertyName];
    if (reservedUsernames.includes(relatedValue.toLowerCase())) return false;
    // (args.object as any)[relatedPropertyName] = relatedValue.toLowerCase();
    return true;
  }
}
