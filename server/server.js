// import express
const express = require("express");
// allows Node.js to make HTTP requests
const fetch = require("node-fetch");
// loads .env file into process.env
require("dotenv").config();

// creates server app
const app = express();
// port that server runs on
const PORT = 3000;

// function runs when someone visits /api/apid
app.get("/api/apod", async (req, res) => {
  try {
    const date = req.query.date;

    // API key coming from process.env
    let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

    if (date) {
      url += `&date=${date}`;
    }

    // send request to NASA, get response and convert to JSON
    const response = await fetch(url);
    const data = await response.json();

    // send data to frontend (browser)
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch APOD" });
  }
});

// starts backend server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});