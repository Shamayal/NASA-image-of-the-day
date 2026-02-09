const data = await fetchApod(date);
import { fetchApod } from "./api.js";

const fetchBtn = document.getElementById("fetchBtn");
const datePicker = document.getElementById("datePicker");

// listen for button click, get selected date, and ask api.js for the data
fetchBtn.addEventListener("click", async () => {
  const date = datePicker.value;

  const data = await fetchApod(date);

  console.log(data);
});