import React from "react";
import { Dialog, IconButton, Grid } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ open, onClose, childComponent }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Grid container justifyContent="flex-end" alignItems="center" padding={2}>
        <IconButton
          edge="end"
          data-testid="closeIcon"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid container padding={4}>
        <Grid item xs={12}>
          {childComponent}
        </Grid>
      </Grid>
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  childComponent: PropTypes.node.isRequired,
};

export default React.memo(Modal);
