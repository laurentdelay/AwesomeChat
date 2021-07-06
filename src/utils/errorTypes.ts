type ErrorCode = "BAD_USER_INPUT";

export class InputError extends Error {
  code: ErrorCode;
  source: string;

  constructor(source: string, message: string) {
    super(message);

    this.code = "BAD_USER_INPUT";
    this.source = source;
  }
}
