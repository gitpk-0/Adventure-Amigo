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

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  // useEffect to get users current coordinates
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

  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      console.log("bounds data");
      console.log(data);
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          {/* xs12 = full width on mobile, medium and larger devices = 4 spaces */}
          <List />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* xs12 = full width on mobile, medium and larger devices = 4 spaces */}
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
