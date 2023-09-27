import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
  Grid,
} from "@mui/material";

const Property = ({ propertyDetail }) => {
  return (
    <>
      <Tooltip title="Edit" arrow>
        <IconButton
          // onClick={() => editPropertyDetails(id)}
          sx={{
            position: "absolute",
            color: "white",
            marginLeft: "16%",
            zIndex: 1,
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <IconButton
          // onClick={() => openDeleteDialog(id)}
          sx={{
            position: "absolute",
            color: "white",
            marginLeft: "18%",
            zIndex: 1,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default React.memo(Property);
