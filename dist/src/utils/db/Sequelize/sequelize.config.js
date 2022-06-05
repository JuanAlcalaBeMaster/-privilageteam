"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbDynamic = exports.db = void 0;
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(`${process.env.DB_NAME_PAYTOOL_DEV}`, `${process.env.DB_USER_PAYTOOL_DEV}`, `${process.env.DB_PASSWORD_PAYTOOL_DEV}`, {
    host: `${process.env.DB_HOST_PAYTOOL_DEV}`,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    timezone: '-05:00',
});
exports.db = db;
const dbDynamic = (dbInfo) => new sequelize_1.Sequelize(`${dbInfo.DB_NAME}`, `${dbInfo.DB_USER}`, `${dbInfo.DB_PASSWORD}`, {
    host: `${dbInfo.DB_HOST}`,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    timezone: '-05:00',
});
exports.dbDynamic = dbDynamic;
