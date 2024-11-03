const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Enables CORS for all origins

// Proxy endpoint for DynamoDB requests
app.use('/dynamodb', async (req, res) => {
  try {
    // Forward the request to the local DynamoDB instance
    const dynamoResponse = await axios({
      method: req.method,
      url: `http://localhost:9911${req.originalUrl}`, // URL of local DynamoDB
      data: req.body,
      headers: req.headers,
    });
    
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS for all origins
    res.json(dynamoResponse.data); // Forward response data back to client
  } catch (error) {
    res.status(error.response ? error.response.status : 500);
    res.json(error.response ? error.response.data : { message: 'Server error' });
  }
});

const PORT = 9912;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
