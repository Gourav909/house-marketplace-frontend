import { Box, Typography, Slider, FormControl } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";


const SliderInput = ({ label, name, value, min, max, onChange }) => (
  <FormControl sx={{ m: 1 }} fullWidth>
    <Typography id={`${name}-slider`} gutterBottom>
      {label}
    </Typography>
    <Slider
      value={value}
      name={name}
      onChange={(event) => onChange(event)}
      valueLabelDisplay="auto"
      aria-labelledby={`${name}-slider`}
      min={min}
      max={max}
      data-testid="slider-input"
    />
    <Box display="flex" justifyContent="space-between">
      <Typography variant="caption">
        {label}: {value[0]}
      </Typography>
      <Typography variant="caption">
        {label}: {value[1]}
      </Typography>
    </Box>
  </FormControl>
);

SliderInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default memo(SliderInput);
