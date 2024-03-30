import { Express } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import React, { useState } from 'react';
import axios from 'axios';
// Import necessary modules
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const PORT = process.env.PORT || 9876;

// Middleware
app.use(bodyParser.json());

// Store numbers and window state
let numbers = [];
const windowSize = 10;

// Function to calculate average of numbers
function calculateAverage(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}

// Function to fetch numbers from test server
async function fetchNumbers(type) {
  try {
    const response = await axios.get(`http://20.244.56.144/test/${type}`);
    return response.data.numbers;
  } catch (error) {
    console.error('Error fetching numbers:', error);
    return [];
  }
}

// Endpoint to handle requests
app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type.toLowerCase();

  // Fetch numbers from test server
  const fetchedNumbers = await fetchNumbers(type);

  // Filter out duplicates and keep only unique numbers
  const uniqueNumbers = [...new Set(fetchedNumbers)];

  // Ignore responses taking longer than 500ms
  if (uniqueNumbers.length === 0) {
    return res.status(500).send('Error fetching numbers');
  }

  // Calculate previous window state
  const windowPrevState = [...numbers];

  // Update numbers array with fetched numbers
  numbers = [...numbers.slice(-windowSize + uniqueNumbers.length), ...uniqueNumbers];

  // Calculate current window state
  const windowCurrState = [...numbers];

  // Calculate average if numbers exceed window size
  let avg = null;
  if (numbers.length >= windowSize) {
    const windowNumbers = numbers.slice(-windowSize);
    avg = calculateAverage(windowNumbers);
  }

  // Construct response
  const response = {
    windowPrevState,
    windowCurrState,
    numbers: uniqueNumbers,
    avg
  };

  // Send response
  res.json(response);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const Solution = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
    // Function to handle fetching numbers from server
    const fetchNumbers = async (type) => {
      try {
        const res = await axios.get(`http://localhost:9876/numbers/${type}`);
        setResponse(res.data);
        setError(null);
      } catch (err) {
        setError(err.response.data);
      }
    };
  
    return (
      <div>
        <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
        <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
        <button onClick={() => fetchNumbers('fibo')}>Fetch Fibonacci Numbers</button>
        <button onClick={() => fetchNumbers('rand')}>Fetch Random Numbers</button>
  
        {error && <p>Error: {error}</p>}
        {response && (
          <div>
            <p>Previous Window State: {JSON.stringify(response.windowPrevState)}</p>
            <p>Current Window State: {JSON.stringify(response.windowCurrState)}</p>
            <p>Numbers: {JSON.stringify(response.numbers)}</p>
            {response.avg && <p>Average: {response.avg}</p>}
          </div>
        )}
      </div>
    );
  };
