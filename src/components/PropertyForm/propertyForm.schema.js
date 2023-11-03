import { object, string, number } from "yup";

const propertyValidationSchema = object().shape({
  title: string().required("Title is required"),
  price_per_month: number()
    .typeError("Price must be a number")
    .required("Price per month is required"),
  net_size: number()
    .typeError("Net size must be a number")
    .required("Net size is required"),
  no_of_rooms: number()
    .typeError("Number of rooms must be a number")
    .required("Number of rooms is required"),
  property_type: string().required("Property type is required"),
  address_attributes: object().shape({
    city_id: string()
      .typeError("City is required")
      .required("City is required"),
    district_id: string()
      .typeError("District is required")
      .required("District is required"),
  }),
  description: string().required("Description is required"),
  image_url: string().nullable().required("Image is required")
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
