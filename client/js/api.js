// Fetch Astronomy Picture of the Day (APOD) data from the server.
// if no date is provided, the API returns today's APOD.
export async function fetchApod(date = "") {
  // start with base API endpoint
  let url = "/api/apod";

  if (date) {
    url += `?date=${date}`;
  }

  // send a GET request to the API endpoint
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch APOD");
  }

  // convert the response from JSON to JS object, and return it when fetchAPOD() called
  return await response.json();
}