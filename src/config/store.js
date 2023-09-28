import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "src/pages/login/login.slice";
import signUpReducer from "src/pages/signUp/signUp.slice";
import propertiesReducer from "src/components/Dashboard/dashboard.slice";
import favoritePropertiesReducer from "src/pages/favoriteProperty/Favorite.slice";
import propertyDetailReducer from "src/pages/PropertyDetail/property.slice";
import propertyReducer from "src/components/admin/propertyForm.slice";
import citiesReducer from "src/utils/cities.slice";
import currenUserReducer from "src/utils/currentUser.slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    properties: propertiesReducer,
    favoriteProperties: favoritePropertiesReducer,
    propertyDetail: propertyDetailReducer,
    property: propertyReducer,
    cities: citiesReducer,
    currentUser: currenUserReducer,
  },
});
