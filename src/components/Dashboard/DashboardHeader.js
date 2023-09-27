import React, { useState } from "react";
import { Grid, Button, IconButton, Tooltip, Paper } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

import SearchBar from "../SearchBar/SearchBar";
import useUserType from "src/utils/hooks/useUserType";

const DashboardHeader = () => {
  const [searchInput, setSearchInput] = useState(null);
  const isAdmin = useUserType();

  const onChangeHandler = (event) => {
    let { value } = event.target;
    setSearchInput(value);
  };

  console.log("searchInput", searchInput);
  return (
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
            <IconButton sx={{ float: "left" }}>
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        {isAdmin && (
          <Grid item xs={6} sm={3} md={2}>
            <Button
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
  );
};

export default DashboardHeader;
