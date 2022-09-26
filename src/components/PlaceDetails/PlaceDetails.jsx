import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Grid,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import "./img/eat.jpg";
// 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const classes = useStyles();

  return (
    <Card elevation={6}>
      {/* elevation gives shadow effect */}
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        {/* place name section */}
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Typography>
            {/* open_now_text */}
            {place?.open_now_text && (
              <Chip
                key={place.open_now_text}
                size="small"
                color="primary"
                // style={{ backgroundColor: "green" }}
                label={place.open_now_text}
                className={classes.chip}
              />
            )}
          </Typography>
        </Box>

        {/* place rating section */}
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>

        {/* place price section */}
        {place?.price_level && (
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>
        )}

        {/* place ranking section */}
        {place?.ranking && (
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
        )}

        {/* place awards section */}
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={1}
          >
            {/* award image */}
            <img src={award.images.small} alt={award.display_name} />
            {/* award description */}
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {/* place cuisine type chips section */}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {/* place address section */}
        {place?.address && (
          <Typography
            gutterbottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {/* place phone number section */}
        {place?.phone && (
          <Typography
            gutterbottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        {/* distance_string (distance away) */}
        {place?.phone && (
          <Typography
            gutterbottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <DirectionsCarIcon />
            <DirectionsBikeIcon />
            <DirectionsBusIcon />
            {Number(place.distance_string[0]) * 0.62} miles away
          </Typography>
        )}

        <CardActions>
          <Box display="flex" justifyContent="space-between">
            {/* place trip advisor link */}
            <Button
              size="medium"
              color="primary"
              // will open in a new tab
              onClick={() => window.open(place.web_url, "_blank")}
            >
              Trip Advisor
            </Button>
            {/* places website link */}
            <Button
              size="medium"
              color="primary"
              // will open in a new tab
              onClick={() => window.open(place.website, "_blank")}
            >
              Website
            </Button>
          </Box>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
