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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var nodemailer = require('nodemailer');
var initialEmail = function (data) {
    var _a, _b, _c, _d, _e;
    return ({
        bodyEmail: {
            email: data.bodyEmail.email,
            subject: data.bodyEmail.subject,
            html: data.bodyEmail.html
        },
        apiKeys: {
            USER_SMTP: ((_a = data.apiKeys) === null || _a === void 0 ? void 0 : _a.USER_SMTP) || "".concat(process.env.EMAIL_USER_SMTP),
            PASSWORD_SMTP: ((_b = data.apiKeys) === null || _b === void 0 ? void 0 : _b.PASSWORD_SMTP) || "".concat(process.env.EMAIL_PASSWORD_SMTP),
            SENDERNAME_SMTP: ((_c = data.apiKeys) === null || _c === void 0 ? void 0 : _c.SENDERNAME_SMTP) || "".concat(process.env.EMAIL_SENDERNAME_SMTP),
            EMAIL_SMTP: ((_d = data.apiKeys) === null || _d === void 0 ? void 0 : _d.EMAIL_SMTP) || "".concat(process.env.EMAIL_EMAIL_SMTP),
            HOST: ((_e = data.apiKeys) === null || _e === void 0 ? void 0 : _e.HOST) || "".concat(process.env.EMAIL_HOST)
        }
    });
};
var EmailSMTP = /** @class */ (function () {
    function EmailSMTP() {
    }
    EmailSMTP.prototype.sendEmail = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var dataEmail, transporter, info, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    dataEmail = initialEmail(params);
                                    transporter = nodemailer.createTransport({
                                        host: "".concat(dataEmail.apiKeys.HOST),
                                        auth: {
                                            user: dataEmail.apiKeys.USER_SMTP,
                                            pass: dataEmail.apiKeys.PASSWORD_SMTP
                                        }
                                    });
                                    return [4 /*yield*/, transporter.sendMail({
                                            from: "\"".concat(dataEmail.apiKeys.SENDERNAME_SMTP, "\" <").concat(dataEmail.apiKeys.EMAIL_SMTP, ">"),
                                            to: "".concat(dataEmail.bodyEmail.email),
                                            subject: "".concat(dataEmail.bodyEmail.subject),
                                            html: "".concat(dataEmail.bodyEmail.html)
                                        })];
                                case 1:
                                    info = _a.sent();
                                    if (info.messageId) {
                                        resolve(info);
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    return [2 /*return*/, reject(error_1)];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return EmailSMTP;
}());
exports["default"] = EmailSMTP;
