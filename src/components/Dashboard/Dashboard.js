import React, { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  Container,
  Pagination,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

import Property from "src/components/Property/Property";
import DashboardHeader from "./DashboardHeader";

import { fetchProperties } from "./dashboard.slice";
import { fetchFavoriteProperties } from "src/pages/favouriteProperties/Favorite.slice";

const Dashboard = ({
  isAdmin = false,
  currentPage,
  setCurrentPage,
  properties,
  paginationData,
  fetching,
  fromFavoritePage = false,
}) => {
  const dispatch = useDispatch();
  const { total_pages } = paginationData || {};

  const handlePageChange = (_, value) => {
    const query = { currentPage: value, query: "" };
    dispatch(fromFavoritePage ? fetchFavoriteProperties(value) : fetchProperties(query));
    setCurrentPage(value);
  };

  const renderCardUI = useMemo(() => {
    if (properties?.length > 0) {
      return (
        <>
          {properties.map((property, index, arr) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4} mb={4}>
              <Property
                currentPageProperties={arr}
                currentPage={currentPage}
                propertyDetail={property}
                isAdmin={isAdmin}
                setCurrentPage={setCurrentPage}
                fromFavoritePage={fromFavoritePage}
              />
            </Grid>
          ))}
        </>
      );
    } else {
      return <h2>No records found</h2>;
    }
    // eslint-disable-next-line
  }, [properties, isAdmin]);

  return (
    <Container>
      {!fromFavoritePage && (
        <DashboardHeader
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isAdmin={isAdmin}
        />
      )}
      <Grid
        container
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
        sx={{ my: 3 }}
      >
        {fetching ? (
          <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          renderCardUI
        )}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {total_pages > 1 && (
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Pagination
              count={total_pages}
              page={currentPage}
              color="primary"
              onChange={(event, value) => handlePageChange(event, value)}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default memo(Dashboard);
