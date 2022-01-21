import Request from "../axios";

interface SendEmail {
  bodyEmail: {
    email: string;
    tags: string;
  };
  customTags: object;
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
          url: `${process.env.URL_BASE_ACTIVE_CAMPAIGN}api_action=${params.apiKeys.api_action}&api_key=${params.apiKeys.api_key}&api_output=json`,
        });
        if (requestAction.status == 200) {
          const results = requestAction.data;
          return resolve(results);
        } else {
          return reject(false);
        }
      } catch (error) {
        console.log("response catch", error);
        return reject(false);
      }
    });
  }
};
