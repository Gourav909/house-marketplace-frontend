import React, { useEffect } from "react";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPropertyDetail } from "./property.slice";

const styles = {
  container: {
    marginTop: "50px",
  },
  title: {
    textAlign: "left",
    marginBottom: "20px",
    marginLeft: "50px",
    color: "text.secondary",
  },
  gridItemLeft: {
    marginLeft: "50px",
    textAlign: "left",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },
};

const PropertyDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isLoading } = useSelector((state) => state.propertyDetail);
  const { properties } = data;
  useEffect(() => {
    dispatch(fetchPropertyDetail(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      {isLoading ? (
        <div style={styles.loaderContainer} data-testid="loading-spinner">
          <CircularProgress />
        </div>
      ) : (
        <Box sx={styles.container}>
          <Typography variant="h4" sx={styles.title}>
            {properties?.title}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} sx={styles.gridItemLeft}>
              <img
                src={`http://localhost:3000/${properties?.image_url}`}
                alt="Property"
                style={{
                  height: "25%",
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} sx={styles.gridItemLeft}>
              <Typography variant="h4">
                NT$ {properties?.price_per_month} / month
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {properties?.description}
              </Typography>
              <Typography variant="h6">
                Location: {properties?.address?.district_name} Dist.,{" "}
                {properties?.address?.city_name}
              </Typography>
              <Typography variant="h6">
                Property Type: {properties?.property_type}
              </Typography>
              <Typography variant="h6">
                Number of Room: {properties?.no_of_rooms}
              </Typography>
              <Typography variant="h6">
                Size: {properties?.net_size} Ping (
                {properties?.net_size_in_sqr_feet} sq.ft)
              </Typography>
              <Typography variant="h6">MRT: {properties?.mrt_line}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default PropertyDetailPage;
