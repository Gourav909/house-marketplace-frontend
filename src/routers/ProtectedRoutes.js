import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as ROUTES from "src/constants/routes";

const ProtectedRoute = ({ children, allowedRoles }) => {
  let location = useLocation();

  const getCurrentUserLoginInfo = () => {
    let tokenInlocalStorage = localStorage.getItem("currentUser");
    let isAuthenticated = {};
    if (tokenInlocalStorage) {
      isAuthenticated = JSON.parse(atob(tokenInlocalStorage));
      return isAuthenticated;
    }
    return isAuthenticated;
  };

  const loginUserInfo = getCurrentUserLoginInfo();

  if (Object.keys(loginUserInfo).length === 0) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (!allowedRoles.includes(loginUserInfo.userType)) {
    return <Navigate to={ROUTES.FORBIDDEN} />;
  }

  return children;
};

export default ProtectedRoute;
