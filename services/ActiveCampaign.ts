import Request from "../axios";

interface SendEmail {
  bodyEmail: {
    email: string;
    tags: string;
  };
  customTags: object;
  typeDataSend?: string;
  apiKeys: {
    api_action: string;
    api_key: string;
  };
}

export default class ActiveCampaign {
  async sendEmail(params: SendEmail) {
    const request = new Request();
    return new Promise(async (resolve, reject) => {
      try {
        const requestAction = await request.post({
          data: { ...params.bodyEmail, ...params.customTags },
          typeDataSend: params.typeDataSend || '',
          url: `${process.env.URL_BASE_ACTIVE_CAMPAIGN}api_action=${params.apiKeys.api_action}&api_key=${params.apiKeys.api_key}&api_output=json`,
        });
        console.log("response emil active campaign", requestAction);
        if (requestAction.result_code == 0) {
          throw false;
        }
        return resolve(requestAction);
      } catch (error) {
        console.log("response catch", error);
        return reject(false);
      }
    });
  }
}
