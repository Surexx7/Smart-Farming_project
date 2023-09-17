/*const container = document.querySelector(".container");
const searchButton = document.querySelector(".searchbar button");
const weatherContent = document.querySelector(".weather-content");
const weatherDetails = document.querySelector("weather-details");
const notFound = document.querySelector(".Invalid-Location");

searchButton.addEventListener("click", () => {
  const APIKey = "e58b85e482ff9a5bd1f8fbf02649a4fc";
  const city = document.querySelector("searchbar input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weatherContent.style.display = "none";
        weatherDetails.style.display = "none";
        notFound.style.display = "block";
        notFound.classList.add("fadein");
        return;
      }

      notFound.style.display = "none";
      notFound.classList.remove("fadein");

      const images = document.querySelector(".weather-content img");
      const temperature = document.querySelector(
        ".weather-content .temperature"
      );
      const description = document.querySelector(
        ".weather-content .description"
      );
      const humidity = document.querySelector(
        ".weather-content .humidity span"
      );
      const wind = document.querySelector(".weather-content .Wind span");

      switch (json.weather[0].main) {
        case "Clear":
          images.src = "images/clear.png";
          break;

        case "Rain":
          images.src = "images/rain.png";
          break;

        case "Clouds":
          images.src = "images/cloud.png";
          break;

        case "Snow":
          images.src = "images/snow.png";
          break;

        case "Mist":
          images.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}Km/H`;

      weatherContent.style.display = "";
      weatherDetails.style.display = "";
      weatherDetails.classList.add("fadein");
      weatherDetails.classList.add("fadein");
      container.style.height = "590px";
    });
});
*/

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const request = document.querySelector("#REQUEST");

search.addEventListener("click", () => {
  const APIKey = "a0123017bdea7f73a2c99a1ad9bc6d33";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .Wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "clear.png";
          break;

        case "Rain":
          image.src = "rain.png";
          break;

        case "Snow":
          image.src = "snow.png";
          break;

        case "Clouds":
          image.src = "cloud.png";
          break;

        case "Haze":
          image.src = "mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});

request.addEventListener('click',function()
{
  return window.location = request.replace("/request.index.html","Request-page")
})