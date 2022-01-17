import { Response } from 'express';
interface BaseResponse {
    codeResponse?: number;
    result?:string;
    message?:string;
    data?: any;
}

class ResponseDTO {
    res:Response;
    
    constructor(res: Response) {
        this.res = res;
    }

    async customResponse(response: BaseResponse) {
        response.codeResponse = response.codeResponse || 200;
        response.result = response.result || 'success';
        response.message = response.message || '';
        response.data = response.data || null;
        return this.res.status(response.codeResponse).json({ ...response });
    }

    async successResponse(response: BaseResponse) {
        response.result = 'success';
        response.codeResponse = 200;
        response.message = response.message || "";
        response.data = response.data || null;
        return this.res.status(response.codeResponse).json({ ...response });
    }

    async errorServerResponse(response: BaseResponse) {
        response.result = 'server error';
        response.codeResponse = 500;
        response.message = response.message || response.message;
        return this.res.status(response.codeResponse).json({ ...response });
    }

}

export default ResponseDTO;
