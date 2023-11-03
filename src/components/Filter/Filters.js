import React, { useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import SelectInput from "src/components/SelectInput/SelectInput";
import SliderInput from "src/components/SliderInput/SliderInput";
import useFetchCitiesAndDistricts from "src/hooks/useFetchCitiesAndDistricts";
import { fetchProperties } from "src/components/Dashboard/dashboard.slice";

const typeOptions = [
  { id: "residential", name: "Residential" },
  { id: "retail", name: "Retail" },
];

const Filters = ({ onClose, currentPage, debouncedSearch }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    city: null,
    district: [],
    property_type: "",
    rent_per_month: [1000, 30000],
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
    return Object.entries(filter)
      .filter(([key, value]) => value != null && value !== "")
      .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .filter((item) => item != null)
            .map((item) => `${key}[]=${encodeURIComponent(item)}`);
        } else {
          return `${key}=${encodeURIComponent(value)}`;
        }
      })
      .join("&");
  };

  const handleSubmit = () => {
    const queryParams = buildQueryParams(selectedFilters);
    const currentPage = 1;
    let queryParam =
      debouncedSearch !== ""
        ? `page=${currentPage}&search=${debouncedSearch}`
        : `page=${currentPage}`;
    let queryParamWithString = queryParams.concat("&", queryParam);
    const queryParamsData = {
      currentPage: currentPage,
      query: debouncedSearch,
      filter: queryParamWithString,
    };
    dispatch(fetchProperties(queryParamsData));
    onClose();
  };

  const { city, property_type, district, net_size, rent_per_month } =
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
          dataTestId="propertyType"
        />

        <SelectInput
          label="City"
          name="city"
          options={cities}
          value={city}
          onChange={handleFilterChange}
          dataTestId="city"
        />

        <SelectInput
          label="District"
          name="district"
          value={district}
          options={districtOptions}
          multiple={true}
          onChange={handleFilterChange}
          dataTestId="district"
        />

        <SliderInput
          label="Net Size"
          name="net_size"
          value={net_size}
          min={300}
          max={3000}
          onChange={handleFilterChange}
          dataTestId="netSize"
        />

        <SliderInput
          label="Rent Per Month"
          name="rent_per_month"
          value={rent_per_month}
          min={1000}
          max={30000}
          onChange={handleFilterChange}
          dataTestId="rentPerMonth"
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
