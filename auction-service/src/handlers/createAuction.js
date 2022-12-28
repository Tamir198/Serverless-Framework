import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

async function createAuction(event, context) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { title } = JSON.parse(event.body);

  const auction = {
    title: title,
    id: uuid.call(),
    status: "open",
    creationTime: new Date().toISOString(),
  };

  //The aws sdk is using callbacks, the promise in here so we can use await
  await dynamoDb
    .put({ TableName: process.env.AUCTIONS_TABLE_NAME, Item: auction })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
