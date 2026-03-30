import { fetchApod } from "./api.js";

const fetchBtn = document.getElementById("fetchBtn");
const datePicker = document.getElementById("datePicker");
const image = document.getElementById("iotdImage");
const video = document.getElementById("iotdVideo");
const title = document.getElementById("title");
const description = document.getElementById("description");
const hdLink = document.getElementById("hdLink");

fetchBtn.addEventListener("click", async () => {
  try {
    const date = datePicker.value;
    
    // Loading message
    title.textContent = "Loading ...";
    description.textContent = "";

    // Hide old media
    image.style.display = "none";
    video.style.display = "none";
    hdLink.style.display = "none";

    // Get APOD data from our server
    const result = await fetchApod(date);
    const data = Array.isArray(result) ? result.find(item => item.date === datePicker.value) : result;
    if (!data) {
      throw new Error("No APOD data found for the selected date.")
    }

    title.textContent = data.title;
    description.innerHTML = data.explanation;

    // Display image or video
    if (data.media_type === "image") {
      image.onload = () => {
        image.style.display = "block";
      };

      image.onerror = () => {
        description.textContent += "\n\nThe image could not be loaded. Try opening it on NASA's website.";
        hdLink.hred = data.url;
        hdLink.textContent = "View on NASA";
        hdLink.style.display = "inline-block";
      };

      image.src = data.url;
      image.alt = data.alt || data.title;
      image.style.display = "block";

      hdLink.href = data.hdurl || data.url;
      hdLink.textContent = "View full-size image";
      hdLink.style.display = "inline-block";

    } else if (data.media_type === "video" || data.media_type === "iframe") {
      const videoUrl = data.url;

      video.src = videoUrl;
      video.style.display = "block";

      description.textContent += "\n\nThis APOD contains video or embedded media.";

      hdLink.href = data.permalink || data.url;
      hdLink.textContent = "Watch on NASA";
      hdLink.style.display = "inline-block";
    } else {
      description.textContent += "\n\nNo supported image or video is available.";
    }
  } catch (error) {
    title.textContent = "Error loading NASA's Astronomy Picture of the Day";
    description.textContent = "Could not load NASA's Astronomy Picture of the Day";
  }
});