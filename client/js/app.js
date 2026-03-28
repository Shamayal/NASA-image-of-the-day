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
    const data = Array.isArray(result) ? result[0] : result;
    console.log("APOD data:", data);
    console.log("Full response:", JSON.stringify(data, null, 2));
    console.log("Media type:", data.media_type);
    console.log("Date:", data.date)
    console.log("Image URL:", data.hdurl);
    console.log("Regular URL:", data.url);
    console.log("Is array?", Array.isArray(data));

    title.textContent = data.title;
    description.innerHTML = data.explanation;

    // Display image or video
    if (data.media_type === "image") {
      image.src = data.hdurl;
      image.alt = data.alt || data.title;
      image.style.display = "block";

      hdLink.href = data.hdurl;
      hdLink.textContent = "View full-size image";
      hdLink.style.display = "inline-block";
    } else if (data.media_type === "video") {
      video.src = data.url;
      video.style.display = "block";
    } else {
      description.textContent += "\n\nNo supported image or video is available.";
    }
  } catch (error) {
    console.error("Error loading APOD:", error);
    title.textContent = "Error loading NASA's Astronomy Picture of the Day";
    description.textContent = "Could not load NASA's Astronomy Picture of the Day";
  }
});