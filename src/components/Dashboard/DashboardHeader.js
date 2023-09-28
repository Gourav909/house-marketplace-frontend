import React, { useCallback, useEffect, useState } from "react";
import { Grid, Button, IconButton, Tooltip, Paper } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

import SearchBar from "../SearchBar/SearchBar";
import useDebounce from "src/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProperties } from "./dashboard.slice";
import Modal from "../Modal/Modal";
import Filters from "../Filter/Filters";

const DashboardHeader = ({ isAdmin, setCurrentPage, currentPage }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchInput);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearch) {
      const queryParams = `page=${1}&search=${debouncedSearch}`;
      dispatch(fetchProperties(queryParams));
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
      return;
    }
  }, [debouncedSearch]);

  const onChangeHandler = (event) => {
    let { value } = event.target;
    setSearchInput(value);
  };

  const handleModalPopup = useCallback(() => {
    setIsFilterModalOpen(!isFilterModalOpen);
  }, [isFilterModalOpen]);

  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          background: "#fbfbfb",
          border: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <SearchBar onChangeHandler={onChangeHandler} />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Tooltip title="Filter" arrow>
              <IconButton
                sx={{ float: "left" }}
                onClick={() => handleModalPopup()}
              >
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          {isAdmin && (
            <Grid item xs={6} sm={3} md={2}>
              <Button
                onClick={() => navigate(`/admin/add-new-property`)}
                variant="contained"
                fullWidth
                endIcon={<AddIcon />}
                sx={{
                  maxWidth: "153px",
                  float: "right",
                }}
              >
                Add
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Modal
        open={isFilterModalOpen}
        onClose={handleModalPopup}
        childComponent={
          <Filters
            debouncedSearch={debouncedSearch}
            currentPage={currentPage}
            onClose={handleModalPopup}
          />
        }
      />
    </>
  );
};

export default DashboardHeader;
