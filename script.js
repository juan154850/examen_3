const apiKey = "d3c39f57206d5904890771c822ffaac3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


// Variables para manejar los errores y los datos mostrados en el front. 
const error = document.querySelector(`.error`);


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
const searchBtn = document.querySelector(`#btn-search`);
searchBtn.addEventListener("click", async () => {
  const city = getCity();
  let data = await getWeather(city.toLowerCase());
  if (data.cod === "404" ){
    error.style.display = "block";
  }else if(data.cod === "200"){
    // Mostramos los datos especificos de la ciudad. 
  }
});
