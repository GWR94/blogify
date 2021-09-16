/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	TABLE_NAME
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config("./env");
}

AWS.config.update({
  region: "eu-west-2",
});

const ddb = new AWS.DynamoDB.DocumentClient();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/api/handle-follow", (req, res) => {
  const { authUserID, followingUser } = req.body;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: followingUser.id,
    },
    ExpressionAttributeValues: {
      ":f": [...followingUser.followers, authUserID],
    },
    UpdateExpression: "SET followers = :f",
    ReturnValues: "ALL_NEW",
  };

  ddb.update(params, (err, db) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(db);
  });
  // Add your code here
});

app.post("/api/handle-unfollow", (req, res) => {
  const { authUserID, followingUser } = req.body;
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: followingUser.id,
    },
    ExpressionAttributeValues: {
      ":f": followingUser.followers.filter((user) => user !== authUserID),
    },
    UpdateExpression: "SET followers = :f",
    ReturnValues: "ALL_NEW",
  };
  ddb.update(params, (err, db) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(db);
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
