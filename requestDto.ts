import * as Express from 'express';
interface responseBase {
    codeResponse?: number;
    result?:string;
    message:string;
    data: object | any[];
}

class ResponseDTO {
    res:Express.Response;
    
    constructor(res: Express.Response) {
        this.res = res;
    }

    async customResponse(response: responseBase):Promise<object> {
        return this.res.status(response.codeResponse!).json({ ...response });
    }

    async successResponse(response: responseBase):Promise<object> {
        response.result = 'success';
        response.codeResponse = 200;
        return this.res.status(response.codeResponse).json({ ...response });
    }

    async errorServerResponse(response: responseBase):Promise<object> {
        return this.res.status(500).json({ ...response });
    }

}

export = ResponseDTO;
