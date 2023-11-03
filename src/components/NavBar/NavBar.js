import React from "react";
import { NavLink as NavLinkBase } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";

import { clearState } from "src/pages/login/login.slice";
import useUserType from "src/hooks/useUserType";

const NavLink = styled((props) => (
  <NavLinkBase {...props} end={props.to === "/"} />
))(() => ({
  textDecoration: "none",
  color: "#f3ececb8",
  "&.active": {
    color: "#ffffff",
    "& button": {
      border: "1px solid",
    },
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const isAdmin = useUserType();

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    dispatch(clearState());
  };

  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <NavLink to="/dashboard" variant="body2">
          <Button color="inherit">Dashboard</Button>
        </NavLink>
        {!isAdmin && (
          <NavLink to="/my-favourites" variant="body2">
            <Button color="inherit"> My Favourites</Button>
          </NavLink>
        )}

        <NavLink to="/" onClick={handleLogOut}>
          <Button color="inherit">Log out</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
