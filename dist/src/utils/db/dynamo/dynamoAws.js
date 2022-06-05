"use strict";
/**
 * @author Luis Martínez
 * @file DynamoDB's library
 * @date 2022-05-19
 * @version 1.0.0
 */
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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1", apiVersion: "2012-08-10" });
exports.default = {
    setItem(tableName, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    TableName: tableName,
                    Item: item
                };
                return yield client.send(new client_dynamodb_1.PutItemCommand(params));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
    deleteItem(tableName, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    TableName: tableName,
                    Key: item
                };
                return yield client.send(new client_dynamodb_1.DeleteItemCommand(params));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
