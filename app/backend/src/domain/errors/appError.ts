import { getReasonPhrase } from 'http-status-codes';

export default class AppError extends Error {
  public name: string;

  public message: string;

  constructor(code: number, message: string) {
    super();
    this.name = getReasonPhrase(code);
    this.message = message;
  }
}
