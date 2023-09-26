import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";

const FavoriteProperty = ({ isFavorite, toggleFavorite }) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        zIndex: 1,
      }}
      onClick={toggleFavorite}
    >
      <FavoriteIcon
        sx={{
          fontSize: "1.5rem",
          fill: isFavorite ? "red" : "white",
        }}
      />
    </IconButton>
  );
};

FavoriteProperty.PropTypes = {
  toggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default FavoriteProperty;
