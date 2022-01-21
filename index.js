"use strict";
exports.__esModule = true;
exports.ActiveCampaig = exports.Request = exports.ResponseDTO = void 0;
var axios_1 = require("./axios");
exports.Request = axios_1["default"];
var responseDto_1 = require("./responseDto");
exports.ResponseDTO = responseDto_1["default"];
var ActiveCampaign_1 = require("./services/ActiveCampaign");
exports.ActiveCampaig = ActiveCampaign_1["default"];
