import React, { memo } from "react";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  Box,
  Chip,
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

const SelectInput = ({
  label,
  name,
  value,
  options,
  multiple = false,
  onChange,
}) => {
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
        renderValue={(selected) =>
          multiple ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((roleId) => (
                <Chip
                  key={roleId}
                  label={options?.find((e) => e.id === roleId).name}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip
                key={selected}
                label={options.find((e) => e.id === selected).name}
              />
            </Box>
          )
        }
        MenuProps={MenuProps}
      >
        {multiple
          ? options?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  data-testid="multiple-checkbox"
                  checked={value?.includes(item.id)}
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))
          : options?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
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
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(SelectInput);
