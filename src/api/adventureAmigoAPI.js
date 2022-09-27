// all api calls
import axios from "axios"; // library to assist with api calls

// bounds received from useEffect in App.js
export const getPlacesData = async (type, sw, ne) => {
  try {
    // request
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat, // bottom left latitude
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng, // top right longitude
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    // if request fails
    // console.log("bounds error");
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    let latt = lat.toFixed(2);
    let long = lng.toFixed(2);
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=${apiKey}`
    );
    // console.log(data.coord.lat);
    // console.log(data.weather[0].icon);
    console.log(
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );

    return data;
  } catch (error) {
    console.log("getWeatherData error");
    console.log(error);
  }
};
