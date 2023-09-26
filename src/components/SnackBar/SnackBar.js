import React from "react";
import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

const Snackar = (props) => {
  const { vertical, horizontal, handleClose, open, altMessage, duration } =
    props;
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {altMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

Snackar.propTypes = {
  vertical: PropTypes.string.isRequired,
  horizontal: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  altMessage: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Snackar;
