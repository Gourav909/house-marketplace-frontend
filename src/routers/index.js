import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import DashboardPage from "src/pages/dashboard/dashboard";
import FavouritePropertiesPage from "src/pages/favouriteProperties/favouriteProperties";
import Header from "src/components/NavBar/NavBar";
import LoginPage from "src/pages/login/Login";
import SignUp from "src/pages/signUp/SignUp";
import PropertyDetailPage from "src/pages/PropertyDetail/PropertyDetailPage";
import PropertyForm from "src/components/admin/PropertyForm";
import * as ROUTES from "src/constants/routes";

const PublicLayout = () => {
  // for all the public routes
  return (
    <>
      <Outlet />
    </>
  );
};

const PrivateLayout = () => {
  // for all the private routes and header
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "*",
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.MY_FAVOURITES,
        element: <FavouritePropertiesPage />,
      },
      {
        path: ROUTES.PROPERTY_DETAILS,
        element: <PropertyDetailPage />,
      },
      {
        path: ROUTES.EDIT_PROPERTIES,
        element: <PropertyForm isEdit={true} />,
      },
      {
        path: ROUTES.ADD_NEW_PROPERTY,
        element: <PropertyForm isEdit={false} />,
      },
    ],
  },
]);

export default router;
