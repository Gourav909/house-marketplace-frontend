import React, { useCallback, useEffect, useState } from "react";
import { Grid, Button, IconButton, Tooltip, Paper } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchBar from "src/components/SearchBar/SearchBar";
import useDebounce from "src/hooks/useDebounce";
import { fetchProperties } from "./dashboard.slice";
import Modal from "src/components/Modal/Modal";
import Filters from "src/components/Filter/Filters";

const DashboardHeader = ({ isAdmin, setCurrentPage, currentPage }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchInput);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearch || searchInput === '') {
      const queryParams = {
        currentPage: 1,
        query: debouncedSearch,
      };
      dispatch(fetchProperties(queryParams));
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
      return;
    }
  // eslint-disable-next-line
  }, [debouncedSearch, searchInput]);

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
                data-testid="addBtn"
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
        title={"Filter Properties"}
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
