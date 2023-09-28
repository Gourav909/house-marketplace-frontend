import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import DashboardPage from "src/pages/dashboard/DashboardPage";
import FavouritePropertiesPage from "src/pages/favouriteProperties/favouriteProperties";
import NavBar from "src/components/NavBar/NavBar";
import LoginPage from "src/pages/login/Login";
import SignUp from "src/pages/signUp/SignUp";
import PropertyDetailPage from "src/pages/PropertyDetail/PropertyDetailPage";
import PropertyForm from "src/components/admin/PropertyForm";
import * as ROUTES from "src/constants/routes";
import ProtectedRoute from "./ProtectedRoutes";
import Forbidden from "src/pages/forbidden/Forbidden";

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
      <NavBar />
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
      {
        path: ROUTES.FORBIDDEN,
        element: <Forbidden />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: (
          <ProtectedRoute allowedRoles={["Admin", "User"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MY_FAVOURITES,
        element: (
          <ProtectedRoute allowedRoles={["User"]}>
            <FavouritePropertiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.PROPERTY_DETAILS,
        element: (
          <ProtectedRoute allowedRoles={["User"]}>
            <PropertyDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.EDIT_PROPERTIES,
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <PropertyForm isEdit={true} />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.ADD_NEW_PROPERTY,
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <PropertyForm isEdit={false} />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
