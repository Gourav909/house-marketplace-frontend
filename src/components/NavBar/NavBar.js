import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { NavLink as NavLinkBase } from "react-router-dom";
import { clearState } from "../../pages/login/login.slice";
import { useDispatch } from "react-redux";
import { styled } from "@mui/system";

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

        <NavLink to="/my-favourites" variant="body2">
          <Button color="inherit"> My Favourites</Button>
        </NavLink>

        <NavLink to="/" onClick={handleLogOut}>
          <Button color="inherit">Log out</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
