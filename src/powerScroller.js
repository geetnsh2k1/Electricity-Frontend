import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/actions/actionCreators"

export default function PowerSlider() {

  const dispatch = useDispatch();
  const { MIN_POWER, MAX_POWER } = bindActionCreators(actionCreators, dispatch) 
  const [value, setValue] = React.useState([0, 500]);

  const handleChange = (event, newValue) => {
    MIN_POWER(newValue[0])
    MAX_POWER(newValue[1])
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
        <Typography id="non-linear-slider" gutterBottom>
            POWER: {`${value[0]} - ${value[1]} W`}
        </Typography>
        <Slider
        getAriaLabel={() => `POWER RANGE`}
        value={value}
        min={0}
        max={2500}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
