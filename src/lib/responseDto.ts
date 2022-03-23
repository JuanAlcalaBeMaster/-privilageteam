import { Response } from "express";
interface BaseResponse {
  codeResponse?: number;
  result?: string;
  message?: string;
  data?: any;
}

class ResponseDTO {
  res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  async customResponse(response?: BaseResponse) {
    const defaultRes = {
      codeResponse: 200,
      result: "success",
      message: "",
      data: null,
    };

    const customResult = { ...defaultRes, ...response };

    return this.res.status(customResult.codeResponse).json({ ...customResult });
  }

  async successResponse(response?: BaseResponse) {
    const defaultRes = {
      codeResponse: 200,
      result: "success",
      message: "",
      data: null,
    };
    const customResult = { ...defaultRes, ...response };

    return this.res.status(customResult.codeResponse).json({ ...customResult });
  }

  async errorServerResponse(response?: BaseResponse) {
    const defaultRes = {
      codeResponse: 500,
      result: "Internal server error",
      message: "Ha sucedido un error, por favor intente más tarde.",
      data: null,
    };
    const customResult = { ...defaultRes, ...response };
    return this.res.status(customResult.codeResponse).json({ ...customResult });
  }
}

export default ResponseDTO;
