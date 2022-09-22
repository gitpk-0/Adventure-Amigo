import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./styles";

const List = () => {
  const classes = useStyles();
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const places = [
    { name: "Nice Place" },
    { name: "Best Drinks" },
    { name: "Best Meat" },
  ];

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels, & Attactions near you
        <FormControl className={classes.formControl}>
          {/* Type of activity drop down menu */}
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          {/* Filter by rating drop down menu */}
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={(e) => setRating(e.target.value)}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>3+ Stars</MenuItem>
            <MenuItem value={3.5}>3.5+ Stars</MenuItem>
            <MenuItem value={4}>4+ Stars</MenuItem>
            <MenuItem value={4.5}>4.5+ Stars</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} className={classes.list}>
          {/* if there are places, map over them */}
          {places?.map((place, i) => {})}
        </Grid>
      </Typography>
    </div>
  );
};

export default List;
