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
        "X-RapidAPI-Key": "ef8cbaab45msh3d28f94f516800ep1f708ejsn087f94796da9",
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
