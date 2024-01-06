// use class-validator
import { ValidationError as ClassValidatorError } from "class-validator";

export class EntityValidationError extends Error {
  errors: ClassValidatorError[];
  constructor(name: string, errors: ClassValidatorError[]) {
    super(`Validation errors in ${name}`);
    this.errors = errors;
  }
}
