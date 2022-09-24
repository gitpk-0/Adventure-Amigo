// all api calls
import axios from "axios"; // library to assist with api calls

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "X-RapidAPI-Key": "ef8cbaab45msh3d28f94f516800ep1f708ejsn087f94796da9",
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

export const getPlaceData = async () => {
  try {
    // request
    const {
      data: { data },
    } = await axious.get(URL, options);

    return data;
  } catch (error) {
    // if request fails
    console.log(error);
  }
};
