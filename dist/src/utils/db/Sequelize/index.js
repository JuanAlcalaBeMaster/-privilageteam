"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.dbDynamic = exports.db = void 0;
const sequelize_config_1 = require("./sequelize.config");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return sequelize_config_1.db; } });
Object.defineProperty(exports, "dbDynamic", { enumerable: true, get: function () { return sequelize_config_1.dbDynamic; } });
const product_model_1 = __importDefault(require("./models/product.model"));
exports.ProductModel = product_model_1.default;
