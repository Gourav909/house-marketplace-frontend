import React, { useState, useCallback } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  addFavoriteProperty,
  deleteFavoriteProperty,
  updateFavouritePagePropeties,
} from "src/pages/favoriteProperty/Favorite.slice";
import DeleteConfirmationDialog from "src/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deletePropertyById } from "src/components/admin/propertyForm.slice";
import FavoriteProperty from "../FavoriteProperty/FavoriteProperty";
import {
  fetchProperties,
  updateDashboardFavPropeties,
} from "../Dashboard/dashboard.slice";

const Property = ({
  propertyDetail,
  isAdmin,
  currentPage,
  arr,
  setCurrentPage,
  isFav,
}) => {
  const {
    id,
    address,
    is_favourite,
    net_size,
    net_size_in_sqr_feet,
    price_per_month,
    property_type,
    title,
    image_url,
  } = propertyDetail;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavIconChanges = useCallback(() => {
    const newFavourite = !is_favourite;
    const formData = new FormData();
    formData.append("property_id", id);
    formData.append("is_favourite", newFavourite);

    if (newFavourite) {
      dispatch(addFavoriteProperty(formData)).then(() =>
        dispatch(updateDashboardFavPropeties({ id, is_favourite: true }))
      );
    } else {
      dispatch(deleteFavoriteProperty(id)).then(() => {
        if (isFav) {
          dispatch(updateFavouritePagePropeties(id));
        }
        dispatch(updateDashboardFavPropeties({ id, is_favourite: false }));
      });
    }
  }, [dispatch, id, is_favourite]);

  const handleHoverIcon = useCallback(() => {
    setIsHovered(!isHovered);
  }, [isHovered]);

  const handleDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  }, [isDeleteDialogOpen]);

  const confirmDelete = useCallback(() => {
    dispatch(deletePropertyById(id)).then((res) => {
      if (res.payload) {
        if (arr.length === 1 && currentPage !== 1) {
          const updateCurrentPage = currentPage - 1;
          dispatch(fetchProperties(`page=${updateCurrentPage}`));
          setCurrentPage(updateCurrentPage);
          localStorage.setItem("currentPage", updateCurrentPage);
        } else {
          dispatch(fetchProperties(`page=${currentPage}`));
        }
      }
    });
    handleDeleteDialog();
  }, [dispatch, id, handleDeleteDialog]);

  const renderAdminActions = useCallback(() => {
    if (!isHovered) return null;
    return (
      <Box
        sx={{
          position: "absolute",
          marginTop: "6px",
          zIndex: 1,
          right: "2%",
        }}
      >
        <Tooltip title="Edit" arrow>
          <IconButton
            onClick={() => navigate(`/admin/edit-properties/${id}`)}
            sx={{
              color: "white",
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton
            onClick={handleDeleteDialog}
            sx={{
              color: "white",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }, [isHovered, navigate, id, handleDeleteDialog]);

  const renderUserFavorite = useCallback(() => {
    if (!isHovered) return null;
    return (
      <FavoriteProperty
        onClick={handleFavIconChanges}
        isFavorite={is_favourite}
      />
    );
  }, [isHovered, handleFavIconChanges, is_favourite]);

  return (
    <Box
      onMouseEnter={handleHoverIcon}
      onMouseLeave={handleHoverIcon}
      key={id}
      sx={{
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      className="card-hover"
    >
      <Card
        sx={{
          maxWidth: 600,
          zIndex: 1,
          position: "relative",
        }}
      >
        {isAdmin ? renderAdminActions() : renderUserFavorite()}
        <CardMedia
          sx={{
            height: 300,
            position: "relative",
          }}
          image={`http://localhost:3000/${image_url}`}
          title={title}
        />
        <CardContent>
          <Typography variant="h4" component="div">
            <Typography color="red" variant="subtitle2" component="span">
              NT$
            </Typography>
            <Typography
              color="red"
              fontSize="24px"
              variant="span"
              component="span"
            >
              {price_per_month}
            </Typography>
            <Typography variant="subtitle2" component="span">
              {" "}
              / month
            </Typography>
          </Typography>
          <Grid sx={{ my: 1 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography color="#6C757D" variant="span" component="span">
              {address.city_name} {address.district_name}
            </Typography>
          </Grid>
          <Grid sx={{ my: 2 }}>
            <Typography variant="subtitle1">
              {net_size} Ping {net_size_in_sqr_feet}
            </Typography>
            <Typography variant="subtitle1">
              Property Type: {property_type}
            </Typography>
          </Grid>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        content="Are you sure you want to delete this property?"
      />
    </Box>
  );
};

export default React.memo(Property);
