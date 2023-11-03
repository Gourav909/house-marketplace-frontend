import React from "react";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ open, onClose, childComponent, title = "" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="modal"
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        padding={3}
        paddingBottom={0}
      >
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        <IconButton
          edge="end"
          data-testid="closeIcon"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid container padding={4} paddingTop={0}>
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
  title: PropTypes.string,
};

export default React.memo(Modal);
