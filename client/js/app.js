import { fetchApod } from "./api.js";

const fetchBtn = document.getElementById("fetchBtn");
const datePicker = document.getElementById("datePicker");
const image = document.getElementById("iotdImage");
const video = document.getElementById("iotdVideo");
const title = document.getElementById("title");
const description = document.getElementById("description");
const hdLink = document.getElementById("hdLink");

// listen for button click, get selected date, and ask api.js for the data
fetchBtn.addEventListener("click", async () => {
  const date = datePicker.value;

  const data = await fetchApod(date);

  if (data.media_type === "image") {
    image.src = data.url;
    image.style.display = "block";
    video.style.display = "none";

    hdLink.href = data.hdurl;
    hdLink.style.display = "inline-block";
  } else if (data.media_type === "video") {
    video.src = data.url;
    video.style.display = "block";
    image.style.display = "none";

    hdLink.style.display = "none";
  }

  title.textContext = data.title;
  description.textContent = data.explanation;
});