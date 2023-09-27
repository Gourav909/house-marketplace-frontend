import * as Yup from "yup";

const propertyValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price_per_month: Yup.number()
    .typeError("Price must be a number")
    .required("Price per month is required"),
  net_size: Yup.number()
    .typeError("Net size must be a number")
    .required("Net size is required"),
  no_of_rooms: Yup.number()
    .typeError("Number of rooms must be a number")
    .required("Number of rooms is required"),
  property_type: Yup.string().required("Property type is required"),
  description: Yup.string().required("Description is required"),
  // address_attributes: Yup.object().shape({
  //   city_id: Yup.string().required("City is required"),
  //   district_id: Yup.string().required("District is required"),
  // }),
});

const initialValues = {
  title: "",
  price_per_month: "",
  net_size: "",
  no_of_rooms: "",
  property_type: "",
  description: "",
  address_attributes: {
    city_id: "",
    district_id: "",
  },
  image_url: "",
};

export { propertyValidationSchema, initialValues };
