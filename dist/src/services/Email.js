"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const initialEmail = (data) => {
    var _a, _b, _c, _d, _e;
    return ({
        bodyEmail: {
            email: data.bodyEmail.email,
            bcc: data.bodyEmail.bcc,
            subject: data.bodyEmail.subject,
            html: data.bodyEmail.html,
        },
        apiKeys: {
            USER_SMTP: ((_a = data.apiKeys) === null || _a === void 0 ? void 0 : _a.USER_SMTP) || `${process.env.EMAIL_USER_SMTP}`,
            PASSWORD_SMTP: ((_b = data.apiKeys) === null || _b === void 0 ? void 0 : _b.PASSWORD_SMTP) || `${process.env.EMAIL_PASSWORD_SMTP}`,
            SENDERNAME_SMTP: ((_c = data.apiKeys) === null || _c === void 0 ? void 0 : _c.SENDERNAME_SMTP) || `${process.env.EMAIL_SENDERNAME_SMTP}`,
            EMAIL_SMTP: ((_d = data.apiKeys) === null || _d === void 0 ? void 0 : _d.EMAIL_SMTP) || `${process.env.EMAIL_EMAIL_SMTP}`,
            HOST: ((_e = data.apiKeys) === null || _e === void 0 ? void 0 : _e.HOST) || `${process.env.EMAIL_HOST}`,
        },
    });
};
class EmailSMTP {
    sendEmail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const dataEmail = initialEmail(params);
                    let transporter = nodemailer.createTransport({
                        host: `${dataEmail.apiKeys.HOST}`,
                        auth: {
                            user: dataEmail.apiKeys.USER_SMTP,
                            pass: dataEmail.apiKeys.PASSWORD_SMTP, // generated ethereal password
                        },
                    });
                    // Bcc or only one recipient email
                    const recipientType = dataEmail.bodyEmail.email ? { to: `${dataEmail.bodyEmail.email}` } : { bcc: dataEmail.bodyEmail.bcc };
                    // send mail with defined transport object
                    let info = yield transporter.sendMail(Object.assign(Object.assign({ from: `"${dataEmail.apiKeys.SENDERNAME_SMTP}" <${dataEmail.apiKeys.EMAIL_SMTP}>` }, recipientType), { subject: `${dataEmail.bodyEmail.subject}`, html: `${dataEmail.bodyEmail.html}` }));
                    if (info.messageId) {
                        resolve(info);
                    }
                }
                catch (error) {
                    return reject(error);
                }
            }));
        });
    }
}
exports.default = EmailSMTP;
