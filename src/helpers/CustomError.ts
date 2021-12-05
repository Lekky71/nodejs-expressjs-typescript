export class CustomError extends Error {
  code: string;
  data?: object;

  constructor(code: string, message: string, data?: object) {
    super();

    this.code = code;
    this.message = message;
    this.data = data;
  }
}
