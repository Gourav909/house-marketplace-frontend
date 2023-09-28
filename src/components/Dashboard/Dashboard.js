import React, { memo, useState, useCallback, useMemo } from "react";
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

import { useDispatch } from "react-redux";
import { fetchProperties } from "./dashboard.slice";

const Dashboard = ({
  isAdmin = false,
  currentPage,
  setCurrentPage,
  properties,
  paginationData,
  fetching,
  isFav = false,
}) => {
  const dispatch = useDispatch();
  const { total_pages } = paginationData || {};

  const handlePageChange = useCallback((_, value) => {
    dispatch(fetchProperties(`page=${value}`));
    localStorage.setItem("currentPage", value);
    setCurrentPage(value);
  }, []);

  const renderCardUI = useMemo(() => {
    if (properties?.length > 0) {
      return (
        <>
          {properties.map((property, index, arr) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4} mb={4}>
              <Property
                arr={arr}
                currentPage={currentPage}
                propertyDetail={property}
                isAdmin={isAdmin}
                setCurrentPage={setCurrentPage}
                isFav={isFav}
              />
            </Grid>
          ))}
        </>
      );
    } else {
      return <h2>No records found</h2>;
    }
  }, [properties, isAdmin]);

  return (
    <Container>
      <DashboardHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAdmin={isAdmin}
      />
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
              onChange={(event, value) => {
                handlePageChange(event, value);
              }}
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default memo(Dashboard);
