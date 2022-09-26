import React, { useState, useEffect } from "react";
// material-ui imports
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api/travelGoAPI";

// react components
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
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
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setfilteredPlaces(filteredPlaces);
  }, [rating]);

  // runs when type, coordinates, or bounds change
  useEffect(() => {
    setIsLoading(true);

    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      // console.log(data);
      setPlaces(data);
      setfilteredPlaces([]); // filteredPlaces reset when params change
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
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
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
