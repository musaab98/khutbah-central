const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});

const TABLE_NAME = "kc-slots";

exports.handler = async (event, context) => {
    const { id, masjidId, userId, status, timestamp, details } = JSON.parse(event.body);

    // Check for required fields
    if(!id || !masjidId || !userId || !status || !timestamp || !details) {
        return {
            statusCode: 400,  // Bad Request
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*" // Adjust as needed
            },
            body: JSON.stringify({ message: "Required fields are missing" })
        };
    }

    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: { S: id },              
            masjidId: { S: masjidId }, 
            userId: { S: userId },      
            status: { S: status },      
            timestamp: { S: timestamp },
            details: { S: details },    
        },
    };

    try {
        await client.send(new PutItemCommand(params));
        return {
            statusCode: 201,  // Resource created
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Slot added successfully: id, ${id}` })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,  // Internal server error
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Unable to add slot: id, ${id}` })
        };
    }
};
