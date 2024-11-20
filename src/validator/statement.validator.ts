import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

//This is used for validating the body from the request
@ValidatorConstraint({ name: 'fxqlValidator', async: false })
export class FxqlValidator implements ValidatorConstraintInterface {
  validate(fxql: string, args: ValidationArguments) {
    const regex =
      /([A-Z]{3}-[A-Z]{3}) \{\\n\s*BUY ([1-9]\d(\.\d+)?)\\n\s*SELL ([1-9]\d(\.\d+)?)\\n\s*CAP (0|[1-9]\d*)\\n\}/g;
    const matches = fxql.match(regex);
    return matches !== null && matches.length === fxql.split('}').length - 1;
  }

  defaultMessage(args: ValidationArguments) {
    return 'FXQL must contain valid blocks in the correct format: USD-GBP {\\n BUY 100.50\\n SELL 200\\n CAP 93800\\n}.';
  }
}
