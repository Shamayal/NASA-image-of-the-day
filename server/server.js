// import express
const express = require("express");
const path = require("path");
//const fetch = require("node-fetch");
// loads .env file into process.env
require("dotenv").config();

// creates server app
const app = express();
// port that server runs on
const PORT = 3000;

// access client folder if a request comes in
app.use(express.static(path.join(__dirname, "../client")));

// function runs when someone visits /api/apod
app.get("/api/apod", async (req, res) => {
  try {
    const params = new URLSearchParams();

    params.set("api_key", process.env.NASA_API_KEY);

    if (req.query.date) {
      params.set("date", req.query.date);
    }

    // API key coming from process.env
    const url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?${params}`;
    
    // send request to NASA, get response and convert to JSON
    const response = await fetch(url);
    const date = await response.json();

    if (!response.ok) {
      console.error("NASA API error:", response.status, data);

      return res.status(response.status).json({
        error: "NASA API request failed",
        details: data
      });
    }

    // send data to frontend (browser)
    res.json(data);
  } catch (error) {
    console.error("Server error:", error.message);

    res.status(500).json({
      error: "Failed to fetch APOD",
      details: error.message
    });
  }
});

// starts backend server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});