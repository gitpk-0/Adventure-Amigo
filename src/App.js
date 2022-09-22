import React from "react";
// material-ui imports
import { CssBaseline, Grid } from "@material-ui/core";

// react components
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
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
          <Map />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
