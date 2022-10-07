import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export default class AppError extends Error {
  public name: string;

  public message: string;

  constructor(code: number, message: string) {
    super();
    this.name = getReasonPhrase(code);
    this.message = message;
  }
}

export const ALL_FIELDS_NOT_FILLED = new AppError(
  StatusCodes.BAD_REQUEST,
  'All fields must be filled',
);
