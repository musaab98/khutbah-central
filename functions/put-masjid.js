const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1"  // Replace with your desired region if different
});
const TABLE_NAME = "kc-masjids";

exports.handler = async (event, context) => {
    const { id, address, khutbahs } = JSON.parse(event.body);
    const formattedKhutbahs = khutbahs.map(khutbah => ({
      M: {
        timeSlot: { S: khutbah.timeSlot },
        speaker: khutbah.speaker ? { S: khutbah.speaker } : { NULL: true }
      }
    }));

    // Check for required fields
    if(!id || !address || !khutbahs) {
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
            id: { S: id },                          // NAME
            address: { S: address },                // ADDRESS
            khutbahs: { L: formattedKhutbahs },              // KHUTBAHS
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
            body: JSON.stringify({ message: `Masjid added successfully: id, ${id}` })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,  // Internal server error
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({ message: `Unable to add masjid: id, ${id}` })
        };
    }
};
