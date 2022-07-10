import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/actions/actionCreators"

export default function CurrentSlider() {

  const dispatch = useDispatch();
  const { MIN_CURRENT, MAX_CURRENT } = bindActionCreators(actionCreators, dispatch) 
  const [value, setValue] = React.useState([0, 10]);

  const handleChange = (event, newValue) => {
    MIN_CURRENT(newValue[0])
    MAX_CURRENT(newValue[1])
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 150 }}>
        <Typography id="non-linear-slider" gutterBottom>
            CURRENT: {`${value[0]} - ${value[1]} A`}
        </Typography>
        <Slider
        getAriaLabel={() => `CURRENT RANGE`}
        value={value}
        min={0}
        max={10}
        step={0.5}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
