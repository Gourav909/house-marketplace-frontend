import React, { useState } from "react";
import {
  Grid,
  Container,
  Pagination,
  Stack,
  Button,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";

import Property from "src/components/Property/Property";
import DashboardHeader from "./DashboardHeader";

const Dashboard = ({ properties = [], favourites = false, loading }) => {
  const renderCardUI = () => {
    if (properties.length) {
      return (
        <>
          {properties.map((property, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4} mb={4}>
              <Property
                propertyDetail={property}
                // setSelectedItemId={setSelectedItemId}
              />
            </Grid>
          ))}
        </>
      );
    } else {
      return <h2>No records found</h2>;
    }
  };

  return (
    <>
      <Container>
        <DashboardHeader />
        <Grid
          container
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
          sx={{ my: 3 }}
        >
          {loading ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="inherit" />
            </Stack>
          ) : (
            renderCardUI()
          )}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* {totalPages > 10 && ( */}
          {/*   <Stack spacing={2} sx={{ mt: 3 }}> */}
          {/*     <Pagination */}
          {/*       count={totalPages} */}
          {/*       page={currentPage} */}
          {/*       color="primary" */}
          {/*       onChange={(event, value) => { */}
          {/*         handlePageChange(event, value); */}
          {/*       }} */}
          {/*     /> */}
          {/*   </Stack> */}
          {/* )} */}
        </Box>
      </Container>
      {/* <Modal */}
      {/*   open={isFilterModalOpen} */}
      {/*   onClose={handleModalPopup} */}
      {/*   childComponent={ */}
      {/*     <Filter */}
      {/*       currentPage={currentPage} */}
      {/*       searchInput={debouncedSearch} */}
      {/*       onClose={handleModalPopup} */}
      {/*     /> */}
      {/*   } */}
      {/* /> */}
    </>
  );
};

export default Dashboard;
