const API_Key = "";
const fetchBtn = document.getElementById("fetchBtn");
const datePicker = document.getElementById("datePicker");

const imgElement = document.getElementById("iotdImage");
const titleElement = document.getElementById("title");
const descElement = document.getElementById("description");
const hdLink = document.getElementById("hdLink");
const carousel = document.getElementById("carousel");

let recentImages = [];

async function fetchIOTD(date = "") {
  const url = date ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
}
// function to display image

// function to add to carousel

// event listener for button