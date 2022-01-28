export class HttpError extends Error {
  status: number;

  message: string;

  result: string;

  constructor(status?: number, message?: string, name?: string) {
    super(message);
    this.status = status || 500;
    this.message =
      message || 'Ha sucedido un error, por favor intente más tarde.';
    this.result = name || 'Internal server error';
  }
}