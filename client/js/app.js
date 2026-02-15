import { fetchApod } from "./api.js";

const fetchBtn = document.getElementById("fetchBtn");
const datePicker = document.getElementById("datePicker");
const image = document.getElementById("iotdImage");
const title = document.getElementById("title");
const description = document.getElementById("description");
const hdLink = document.getElementById("hdLink");

// listen for button click, get selected date, and ask api.js for the data
fetchBtn.addEventListener("click", async () => {
  const date = datePicker.value;

  const data = await fetchApod(date);

  console.log(data);
  image.src = data.url;
  title.textContext = data.title;
  description.textContent = data.explanation;
  hdLink.href = data.hdurl;
});