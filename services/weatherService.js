import axios from "axios";

export const getWeather = async (location) => {
  const unitSystem = "metric";
  const WEATHER_API_KEY = "";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
  return await axios
    .request({ baseURL: weatherUrl, method: "GET" })
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
