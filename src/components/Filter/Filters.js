import React, { useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import SelectInput from "../SelectInput/SelectInput";
import SliderInput from "../SliderInput/SliderInput";
import useFetchCitiesAndDistricts from "src/hooks/useFetchCitiesAndDistricts";
import { fetchProperties } from "../Dashboard/dashboard.slice";

const typeOptions = [
  { id: "residential", name: "Residential" },
  { id: "retail", name: "Retail" },
];

const Filters = ({ onClose, currentPage, debouncedSearch }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    city: null,
    district: [],
    property_type: "",
    price_per_month: [1000, 30000],
    net_size: [300, 3000],
  });

  const [districtOptions, setDistrictOptions] = useState([]);
  const fetchedCities = useFetchCitiesAndDistricts();
  const dispatch = useDispatch();
  const { cities } = fetchedCities?.data || [];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "city") {
      let selectedCity = cities.find((item) => item.id === value);
      setDistrictOptions(selectedCity.districts);
      setSelectedFilters({
        ...selectedFilters,
        [name]: selectedCity.id,
      });
      return;
    }
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };

  const buildQueryParams = (filter) => {
    const queryParams = [];

    for (const key in filter) {
      const value = filter[key];

      if (value !== null && value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          queryParams.push(`filter_by[${key}]=${value.join(",")}`);
        } else {
          queryParams.push(`filter_by[${key}]=${value}`);
        }
      }
    }

    return queryParams.join("&");
  };

  const handleSubmit = () => {
    const queryParams = buildQueryParams(selectedFilters);
    let queryParam =
      debouncedSearch !== ""
        ? `page=${currentPage}&search=${debouncedSearch}`
        : `page=${currentPage}`;
    let queryParamWithString = queryParams.concat("&", queryParam);
    dispatch(fetchProperties(queryParamWithString));
    onClose();
  };

  const { city, property_type, district, net_size, price_per_month } =
    selectedFilters;

  return (
    <Grid container spacing={2} sx={{ marginTop: "2px" }}>
      <Grid item xs={12}>
        <SelectInput
          label="Property Type"
          name="property_type"
          value={property_type}
          options={typeOptions}
          onChange={handleFilterChange}
        />

        <SelectInput
          label="City"
          name="city"
          options={cities}
          value={city}
          onChange={handleFilterChange}
        />

        <SelectInput
          label="District"
          name="district"
          value={district}
          options={districtOptions}
          multiple={true}
          onChange={handleFilterChange}
        />

        <SliderInput
          label="Net Size"
          name="net_size"
          value={net_size}
          min={300}
          max={3000}
          onChange={handleFilterChange}
        />

        <SliderInput
          label="Rent Per Month"
          name="price_per_month"
          value={price_per_month}
          min={1000}
          max={30000}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="flex-end">
        <Box mt={2}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            sx={{ marginRight: "20px" }}
            onClick={handleSubmit}
          >
            Apply Filters
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="medium"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

Filters.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Filters);
