import React, { memo } from "react";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectInput = ({ label, name, value, options, multiple, onChange }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel data-testid="input-label">{label}</InputLabel>
      <Select
        label={label}
        value={value}
        name={name}
        onChange={handleChange}
        multiple={multiple}
        input={multiple ? <OutlinedInput label={label} /> : undefined}
        renderValue={(selected) => (multiple ? selected.join(", ") : selected)}
        MenuProps={MenuProps}
      >
        {multiple
          ? options.map((name) => (
              <MenuItem key={name} value={name} >
                <Checkbox  data-testid="multiple-checkbox" checked={value.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))
          : options.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
  
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  multiple: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  options:  PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(SelectInput);
