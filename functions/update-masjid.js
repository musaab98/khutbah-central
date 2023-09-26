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
      body: JSON.stringify({ message: 'Masjid ID must be provided' })
    };
  }

  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  if (!body || !body.address || !body.times || !body.adminId) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Address, times, and adminId must be provided in the request body' })
    };
  }

  const tableName = "kc-masjids"; 

  const params = {
    TableName: tableName,
    Key: {
      id: { S: id },
    },
    UpdateExpression: "SET address = :a, times = :t, adminId = :ad",
    ExpressionAttributeValues: {
      ":a": { S: body.address },
      ":t": { S: body.times },
      ":ad": { S: body.adminId },
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
      body: JSON.stringify({ message: 'Masjid updated successfully', updatedItem: data.Attributes })
    };
  } catch (err) {
    console.error(err);
    let responseBody;
    let statusCode;

    if (err.name === 'ConditionalCheckFailedException') {
      responseBody = JSON.stringify({ message: `Masjid with ID ${id} not found` });
      statusCode = 404;
    } else {
      responseBody = JSON.stringify({ message: 'Unable to update masjid' });
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
