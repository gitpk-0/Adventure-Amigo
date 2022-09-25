// all api calls
import axios from "axios"; // library to assist with api calls

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

// bounds received from useEffect in App.js
export const getPlacesData = async (sw, ne) => {
  try {
    // request
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat, // bottom left latitude
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng, // top right longitude
      },
      headers: {
        "X-RapidAPI-Key": "fc9de4c79dmshd1eb046316c8cb8p1c01f1jsnab6ba0f6c796",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });

    return data;
  } catch (error) {
    // if request fails
    console.log("bounds error");
    console.log(error);
  }
};
