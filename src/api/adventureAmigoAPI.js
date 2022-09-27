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
          "X-RapidAPI-Key":
            "fc9de4c79dmshd1eb046316c8cb8p1c01f1jsnab6ba0f6c796",
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
    const apiKey = "baa163b0c95b6696f3c24313452bd64e";
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=${apiKey}`
    );
    console.log(data.weather[0].icon);

    return data;
  } catch (error) {}
};
