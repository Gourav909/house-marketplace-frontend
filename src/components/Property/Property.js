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
  fetchFavoriteProperties,
  deleteFavoriteProperty,
  updateFavouritePagePropeties,
} from "src/pages/favouriteProperties/Favorite.slice";
import DeleteConfirmationDialog from "src/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deletePropertyById } from "src/components/PropertyForm/propertyForm.slice";
import FavoriteProperty from "src/components/FavoriteProperty/FavoriteProperty";
import {
  fetchProperties,
  updateDashboardFavPropeties,
} from "src/components/Dashboard/dashboard.slice";

const Property = ({
  propertyDetail,
  isAdmin,
  currentPage,
  currentPageProperties,
  setCurrentPage,
  fromFavoritePage,
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

  const handleAction = (newFavourite, formData) => {
    if (newFavourite) {
      dispatch(addFavoriteProperty(formData)).then(() =>
        dispatch(updateDashboardFavPropeties({ id, is_favourite: true }))
      );
    } else {
      dispatch(deleteFavoriteProperty(id)).then(() => {
        if (fromFavoritePage) {
          dispatch(updateFavouritePagePropeties(id));
        }
        dispatch(updateDashboardFavPropeties({ id, is_favourite: false }));
        if (currentPage !== 1 && currentPageProperties.length === 1) {
          const updatedCurrentPage = currentPage - 1;
          setCurrentPage(updatedCurrentPage);
          dispatch(fetchFavoriteProperties(updatedCurrentPage));
        }
      });
    }
  };

  const handleFavIconChanges = useCallback(() => {
    const newFavourite = !is_favourite;
    const formData = new FormData();
    formData.append("property_id", id);
    formData.append("is_favourite", newFavourite);
    handleAction(newFavourite, formData);
  // eslint-disable-next-line
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
        if (currentPageProperties.length === 1 && currentPage !== 1) {
          const updatedCurrentPage = currentPage - 1;
          setCurrentPage(updatedCurrentPage);
          dispatch(fetchProperties({ currentPage: updatedCurrentPage, query: "" }));
        } else {
          dispatch(fetchProperties({ currentPage, query: "" }));
        }
      }
    });

    handleDeleteDialog();
  // eslint-disable-next-line
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
            data-testid="edit-button"
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
            data-testid="delete-button"
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
        position: "relative",
      }}
      className="card-hover"
      data-testid="property-card"
    >
      <Card
        sx={{
          maxWidth: 600,
          zIndex: 1,
        }}
      >
        {isAdmin ? renderAdminActions() : renderUserFavorite()}

        <Box
          onClick={() =>
            !isAdmin ? navigate(`/user/property-details/${id}`) : null
          }
          data-testid="box-card"
        >
          <CardMedia
            sx={{
              height: 300,
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
                {address?.city_name} {address?.district_name}
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
        </Box>
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
