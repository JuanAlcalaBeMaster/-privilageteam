import axios, { AxiosResponse } from 'axios';

interface AuthInterface {
  token?: string;
}

interface BaseOptionRequest {
  url?: string;
  endpoint?: string;
  data?: string | object | any[];
  headers?: object;
  auth?: AuthInterface;
}

const headerObjectDefault: any = {
  token: (token: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
  default: () => ({
    'Content-Type': 'application/json',
  }),
};

export default class Request {
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || `${process.env.URL_BASE_REQUEST}`;
  }

  static setAuthorizationDefault(auth: AuthInterface) {
    return headerObjectDefault[Object.keys(auth)[0]](auth.token);
  }

  async get(options: BaseOptionRequest) {
    try {
      let headersTemp: object;
      if (options.headers) {
        headersTemp = { ...options.headers };
      } else {
        headersTemp = options.auth
          ? Request.setAuthorizationDefault(options.auth)
          : headerObjectDefault.default;
      }

      const response: AxiosResponse = await axios.get(
        `${options.url ? options.url : this.baseUrl + options.endpoint}`,
        { ...headersTemp },
      );
      return response.data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async post(options: BaseOptionRequest) {
    try {
      let headersTemp: object;
      if (options.headers) {
        headersTemp = { ...options.headers };
      } else {
        headersTemp = options.auth
          ? Request.setAuthorizationDefault(options.auth)
          : headerObjectDefault.default;
      }

      const response: AxiosResponse = await axios.post(
        `${options.url ? options.url : this.baseUrl + options.endpoint}`,
        JSON.stringify(options.data) || {},
        { ...headersTemp },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Request Error: ${error}`);
    }
  }

  async put(options: BaseOptionRequest) {
    try {
      let headersTemp: object;
      if (options.headers) {
        headersTemp = { ...options.headers };
      } else {
        headersTemp = options.auth
          ? Request.setAuthorizationDefault(options.auth)
          : headerObjectDefault.default;
      }

      const response: AxiosResponse = await axios.post(
        `${options.url ? options.url : this.baseUrl + options.endpoint}`,
        JSON.stringify(options.data) || {},
        { ...headersTemp },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Request Error: ${error}`);
    }
  }
}
