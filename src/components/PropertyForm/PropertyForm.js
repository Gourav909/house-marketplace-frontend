import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";

import {
  fetchPropertyById,
  updatePropertyById,
  addProperty,
} from "./propertyForm.slice";
import * as ROUTES from "src/constants/routes";
import { flattenNestedObject } from "src/utils/flattenObject";
import { propertyValidationSchema, initialValues } from "./propertyForm.schema";
import { FORM_DATA_KEYS } from "src/utils/constants";
import { fetchCities } from "src/utils/commonSlices/cities.slice";

const PaperComponent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "#fbfbfb",
  border: "1px solid #ccc",
}));

const PropertyForm = ({ isEdit = false }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  const { citiesData } = useSelector((state) => state.cities);

  // get data of selected property
  const { data, isSuccess, isFetching } = useSelector((state) => {
    return state.property;
  });
  const { properties: propertyToEdit } = data;

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchPropertyById(params.id));
    }
  // eslint-disable-next-line
  }, [params.id]);

  useEffect(() => {
    if (!isFetching && isSuccess && isEdit) {
      populatePropertyForm(propertyToEdit);
    }
  // eslint-disable-next-line
  }, [isFetching, isSuccess, isEdit]);

  useEffect(() => {
    if (cityOptions.length === 0) {
      dispatch(fetchCities());
    }
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCityOptions(citiesData.cities);
  }, [citiesData]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyValidationSchema,
    onSubmit: (values) => {
      const { image_url } = values;
      const flattenedObject = flattenNestedObject(values);
      const formData = new FormData();

      Object.entries(FORM_DATA_KEYS).forEach(([key, val]) =>
        formData.append(key, flattenedObject[val])
      );

      if (!isEdit) {
        formData.append("image", image_url);
        dispatch(addProperty(formData)).then(() => {
          navigate(ROUTES.DASHBOARD);
        });
      } else {
        const updateData = { id: params.id, formData };
        dispatch(updatePropertyById(updateData)).then(() => {
          navigate(ROUTES.DASHBOARD);
        });
      }
    },
  });

  const {
    setValues,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    dirty,
    isValid,
    setFieldValue,
  } = formik;

  const populatePropertyForm = (data) => {
    setValues({
      title: data?.title,
      price_per_month: data?.price_per_month,
      net_size: data?.net_size,
      no_of_rooms: data?.no_of_rooms,
      property_type: data?.property_type,
      description: data?.description,
      address_attributes: {
        city_id: data?.address?.city_id,
        district_id: data?.address?.district_id,
      },
      image_url: data?.image_url && `${process.env.REACT_APP_BASE_URL}${data?.image_url}`,
      mrt: data?.mrt,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFieldValue("image_url", file);
  };

  const handleDistrictOptions = (e) => {
    const selectedValue = e.target.value;
    setFieldValue("address_attributes.city_id", selectedValue);
    cityOptions.forEach((district) => {
      if (district.id === selectedValue) {
        setDistrictOptions(district.districts);
      }
    });
  };

  useEffect(() => {
    if (cityOptions?.length) {
      cityOptions.forEach((district) => {
        if (district.id === values.address_attributes?.city_id) {
          setDistrictOptions(district.districts);
        }
      });
    }
  }, [values.address_attributes?.city_id, cityOptions]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <PaperComponent elevation={3}>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "20px" }}
          >
            {isEdit ? "Edit Property" : "Add Property"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="property_type">Property Type</InputLabel>
                  <Select
                    label="Property Type"
                    id="property_type"
                    name="property_type"
                    value={values.property_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.property_type && errors.property_type
                    )}
                    data-testid="propertyType"
                  >
                    <MenuItem value="residential">Residential</MenuItem>
                    <MenuItem value="retail">Retail</MenuItem>
                  </Select>
                  <FormHelperText>
                    {touched.property_type && errors.property_type}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="price_per_month"
                  name="price_per_month"
                  label="Price Per Month"
                  variant="outlined"
                  value={values.price_per_month}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(
                    touched.price_per_month && errors.price_per_month
                  )}
                  helperText={touched.price_per_month && errors.price_per_month}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="net_size"
                  name="net_size"
                  label="Net Size"
                  variant="outlined"
                  value={values.net_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.net_size && errors.net_size)}
                  helperText={touched.net_size && errors.net_size}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="no_of_rooms"
                  name="no_of_rooms"
                  label="Number of Rooms"
                  variant="outlined"
                  value={values.no_of_rooms}
                  error={Boolean(touched.no_of_rooms && errors.no_of_rooms)}
                  helperText={touched.no_of_rooms && errors.no_of_rooms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="mrt"
                  name="mrt"
                  label="MRT"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={values.mrt}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.mrt && errors.mrt)}
                  helperText={touched.mrt && errors.mrt}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="City">City</InputLabel>
                  <Select
                    label="City"
                    id="address_attributes.city_id"
                    name="address_attributes.city_id"
                    value={values.address_attributes?.city_id}
                    onChange={handleDistrictOptions}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.address_attributes?.city_id &&
                        errors.address_attributes?.city_id
                    )}
                    data-testid="city"
                  >
                    {cityOptions?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{color: "#d32f2f"}} >
                    {touched.address_attributes?.city_id &&
                      errors.address_attributes?.city_id}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="address_attributes.district_id">
                    District
                  </InputLabel>
                  <Select
                    label="District"
                    id="address_attributes.district_id"
                    name="address_attributes.district_id"
                    value={values.address_attributes?.district_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.address_attributes?.city_id}
                    error={Boolean(
                      touched.address_attributes?.district_id &&
                        errors.address_attributes?.district_id
                    )}
                    data-testid="district"
                  >
                    {districtOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{color: "#d32f2f"}}>
                    {touched.address_attributes?.district_id &&
                      errors.address_attributes?.district_id}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                { isEdit && values?.image_url ?
                  <Box mt={2} textAlign="center">
                    <img src={values?.image_url} alt="property" height="100px" />
                  </Box> :
                  <input
                    type="file"
                    id="image_url"
                    name="image_url"
                    data-testid="imageUrl"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
              disabled={!dirty || !isValid}
            >
              {isEdit ? "Update Property" : "Create Property"}
            </Button>
          </Box>
        </PaperComponent>
      </div>
    </Container>
  );
};

export default PropertyForm;
