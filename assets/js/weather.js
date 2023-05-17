// Weather API Key
var weatherApiKey = "0874d781cac886c8251059cc7a09d09a";

// Try to get the coordinates from localStorage
var storedLat = localStorage.getItem("latitude");
var storedLon = localStorage.getItem("longitude");

// If we have coordinates in localStorage, use them to display weather
if (storedLat && storedLon) {
  fetchWeatherData(storedLat, storedLon);
} else {
  // Otherwise, ask the user for their location
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Store the coordinates in localStorage for future use
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lon);
    // Calls fetchWeatherData function with lat and lon params
    fetchWeatherData(lat, lon);
  });
}

// Creates a function for fetchWeatherData that takes in lat and lon params
function fetchWeatherData(lat, lon) {
  // calling the fetch function to send a request to weather API for data specifying the latitude and longitude
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
  // when the fetch request completes, take the response, convert it to json format
    .then(response => response.json())
    // after the response has been converted to json, take data and do the following to it
    .then(data => {
      // creates variables for information from json
      var temperature = data.main.temp;
      var weatherDescription = data.weather[0].description;
      var weatherIcon = data.weather[0].icon;
      // creates variable for weather icon
      var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

      // Create an img element for the weather icon
      var weatherIconElement = document.createElement("img");
      weatherIconElement.src = weatherIconUrl;
      weatherIconElement.alt = "Weather icon";

      // Get the weather element
      var weatherElement = document.querySelector("#weather");

      // Clear out the weather element's current contents
      while (weatherElement.firstChild) {
        weatherElement.firstChild.remove();
      }

      // Add the temperature, weather description, and weather icon to the weather element
      weatherElement.textContent = `Temperature: ${temperature}\u2109 | Description: ${weatherDescription} `;
      weatherElement.appendChild(weatherIconElement);
    });
}