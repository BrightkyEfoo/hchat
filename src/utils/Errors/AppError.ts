import { commonTypes } from '../../constants/Errors/comonTypes';

export class AppError extends Error {
  public readonly commonType: keyof typeof commonTypes;
  public readonly isOperational: boolean;
  public readonly isAppError = true;
  constructor(
    commonType: keyof typeof commonTypes,
    description: string,
    isOperational: boolean
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.commonType = commonType;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }

  static isAppError(object: any) {
    if (!object)
      throw Error(
        `Invalid argument for isAppError function, founded "${object}"`
      );
    return object.isAppError;
  }

  toString() {
    return `AppError: \n\tname: ${this.name} \n\ttype: ${this.commonType} \n\tisOperational: ${this.isOperational} \n\tdescription: ${this.message}`;
  }
}
