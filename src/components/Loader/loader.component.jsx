import { LinearProgress } from "@mui/material";
import React, { Fragment } from "react";
import './loader.styles.scss'
/**
 * Displays the progress / scale 
 * @param {string} variant 
 * @param {string} value  - The value to display and to show it on scale
 * @param {string} sx - custom styles for mui  
 * @param {string} size - size of progrss bar 
 * @returns Linear Progress UI
 */
const Loader = ({ variant, value, sx, size, thickness, color }) => {
  return (
    <Fragment>
      <LinearProgress
        size={size}
        thickness={thickness}
        variant={variant}
        value={value}
        sx={sx}
        color={color}
        className="progress"
        data-testid="loader"
      />
    </Fragment>
  );
};

export default Loader;
