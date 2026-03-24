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

  try {
    fetchBtn.disabled = true;

    const data = await fetchApod(date);

    title.textContent = data.title;
    description.textContent = data.explanation;

    if (data.media_type === "image" && data.hdurl) {
      image.src = data.hdurl;
      image.alt = data.alt || data.title;
      image.style.display = "block";
      video.style.display = "none";

      hdLink.href = data.hdurl;
      hdLink.textContent = "View full-size image";
      hdLink.style.display = "inline-block";
    } else {
      image.style.display = "none";
      video.style.display = "none";

      hdLink.href = data.url;
      hdLink.textContent = "View APOD on NASA";
      hdLink.style.display = "inline-block";
    }
  } catch (error) {
    console.error("Failed to load APID:", error);

    title.textContent = "Unable to load APOD";
    description.textContent = "Please try again later or check the server terminal for detail.";
  } finally {
    fetchBtn.disabled = false;
  }
});