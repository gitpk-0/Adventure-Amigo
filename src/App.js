import React, { useState, useEffect } from "react";
// material-ui imports
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api/adventureAmigoAPI";

// react components
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setfilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // useEffect to get users current coordinates
  //// only runs on initial page load
  useEffect(() => {
    // using built in browser geolocation api
    navigator.geolocation.getCurrentPosition(
      // destructuring returned data to get coordinates (lat, lng)
      ({ coords: { latitude, longitude } }) => {
        // coordinates being passed to useState function from setCoordinates
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // useEffect to allow filtering by rating
  //// runs when the rating filter is changed
  useEffect(() => {
    // if place.rating is larger than current rating return those places
    const filteredPlaces = places.filter(
      (place) => Number(place.rating) > rating
    );

    setfilteredPlaces(filteredPlaces);
  }, [places, rating]);

  // runs when type, coordinates, or bounds change
  useEffect(() => {
    if (bounds.ne && bounds.sw) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0)); // filter out places without a name or zero reviews
        setfilteredPlaces([]); // filteredPlaces reset when params change
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  // console.log(places);
  // console.log(filteredPlaces);
  // console.log(filteredPlaces.length);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          {/* xs12 = full width on mobile, medium and larger devices = 4 spaces */}
          <List
            // if we have filteredPlaces render filteredPlaces else render all places
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* xs12 = full width on mobile, medium and larger devices = 4 spaces */}
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            // if we have filteredPlaces render filteredPlaces else render all places
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
