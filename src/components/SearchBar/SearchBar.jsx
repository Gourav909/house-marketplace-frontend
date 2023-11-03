import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onChangeHandler }) => (
  <>
    <TextField
      type="search"
      id="search-bar"
      data-testid="searchBar"
      variant="outlined"
      placeholder="Search Properties..."
      sx={{width: "100%"}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon data-testid="searchIcon"/>
          </InputAdornment>
        ),
      }}
      onChange={(event) => onChangeHandler(event)}
    />
  </>
);

SearchBar.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
};

export default SearchBar;
