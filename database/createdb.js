// Import the DynamoDBClient and CreateTableCommand from AWS SDK v3
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

// Create DynamoDB client instance configured for local use with dummy credentials
const client = new DynamoDBClient({
  region: "local", // Any region is fine for local usage
  endpoint: "http://localhost:9911", // Point to local DynamoDB instance
  credentials: {
    accessKeyId: "dummy", // Dummy access key
    secretAccessKey: "dummy", // Dummy secret key
  },
});

// Function to create the 'Patients' table with dodid as the partition key and timestamp as the sort key
const createPatientsTable = async () => {
  const params = {
    TableName: "Patients",
    AttributeDefinitions: [
      { AttributeName: "dodid", AttributeType: "S" }, // dodid as String
      { AttributeName: "statustimestamp", AttributeType: "N" }, // timestamp as Number
    ],
    KeySchema: [
      { AttributeName: "dodid", KeyType: "HASH" }, // Partition key
      { AttributeName: "statustimestamp", KeyType: "RANGE" }, // Sort key
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    const command = new CreateTableCommand(params);
    const data = await client.send(command);
    console.log("Table created successfully:", data);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Run the function to create the table
createPatientsTable();
