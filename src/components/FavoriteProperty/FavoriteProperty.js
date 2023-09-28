import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import propTypes from "prop-types";

const FavoriteProperty = ({ isFavorite, onClick }) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        zIndex: 1,
        right: "4%",
      }}
      onClick={onClick}
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

FavoriteProperty.propTypes = {
  onClick: propTypes.func.isRequired,
  isFavorite: propTypes.bool.isRequired,
};

export default FavoriteProperty;
