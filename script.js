const apiKey = "d3c39f57206d5904890771c822ffaac3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Variables para manejar los errores y los datos mostrados en el front.
const error = document.querySelector(`.error`);
const temp = document.querySelector(`.temp`);
const weather = document.querySelector(`.weather`);
const city = document.querySelector(`.city`);
const humidity = document.querySelector(`.humidity`);
const wind = document.querySelector(`.wind`);
const weatherIcon = document.querySelector(`.weather-icon`);

const weathers = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
};

// Lógica para obtener la ciudad que se desea consultar
const getCity = () => {
  const city = document.querySelector(`[class="search"] > input`).value;
  return city;
};

// Logica para llamar a la API y obtener los datos de la ciudad
const getWeather = async (city) => {
  //Manejo del error
  try {
    const response = await fetch(
      `${apiUrl}${city.toLowerCase()}&appid=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

// La función se dispara cuando se le da click al botón de buscar, para esto debemos agregarle un ID.
const searchBtn = document.querySelector(`[class="search"] > button`);
searchBtn.addEventListener("click", async () => {
  const searchedCity = getCity();
  let data = await getWeather(searchedCity.toLowerCase());
  if (data.cod === "404") {
    error.style.display = "block";
    weather.style.display = "none";
  } else if (data.cod === 200) {
    // Mostramos los datos especificos de la ciudad.
    temp.innerHTML = `${data.main.temp}°C`;
    console.log(data.name);
    city.innerHTML = `${data.name}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed} km/h`;
    weatherIcon.setAttribute("src", `${weathers[data.weather[0].main]}`);
    weather.style.display = "block";
    error.style.display = "none";
  }
});

// searchInput.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     handleSearch();
//   }
// });
