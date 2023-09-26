const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});

exports.handler = async (event, context) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Slot ID must be provided' })
    };
  }

  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  // You can expand these checks as per your requirements for various fields.
  if (!body || !body.status || !body.details) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Status and details must be provided in the request body' })
    };
  }

  const tableName = "kc-prayer-slots"; 

  const params = {
    TableName: tableName,
    Key: {
      id: { S: id },
    },
    UpdateExpression: "SET status = :s, details = :d",
    ExpressionAttributeValues: {
      ":s": { S: body.status },
      ":d": { S: body.details },
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await client.send(new UpdateItemCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*"
      },
      body: JSON.stringify({ message: 'Slot updated successfully', updatedItem: data.Attributes })
    };
  } catch (err) {
    console.error(err);
    let responseBody;
    let statusCode;

    // Check if the error is due to the item not being found
    if (err.name === 'ConditionalCheckFailedException') {
      responseBody = JSON.stringify({ message: `Slot with ID ${id} not found` });
      statusCode = 404;
    } else {
      responseBody = JSON.stringify({ message: 'Unable to update slot' });
      statusCode = 500; 
    }

    return {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*"
      },
      body: responseBody
    };
  }
};
