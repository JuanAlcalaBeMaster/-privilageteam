/**
 * @author Luis Martínez
 * @file DynamoDB's library
 * @date 2022-05-19
 * @version 1.0.0
 */

 import { DynamoDBClient, 
    PutItemCommand, 
    DeleteItemCommand, 
    DeleteItemCommandInput, 
    PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";

 const client = new DynamoDBClient({ region: "us-east-1", apiVersion: "2012-08-10" });

 export default {
    async setItem(tableName: string, item: any) {
        try {
            const params: PutItemCommandInput = {
                TableName: tableName,
                Item: item
            };
            return await client.send(new PutItemCommand(params));
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async deleteItem(tableName: string, item: any) {
        try {
            const params: DeleteItemCommandInput = {
                TableName: tableName,
                Key: item
            };

            return await client.send(new DeleteItemCommand(params));
        } catch (error: any) {
            throw new Error(error);
        }
    }
};