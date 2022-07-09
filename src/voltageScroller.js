import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/actions/actionCreators"

export default function VoltageSlider() {

  const dispatch = useDispatch();
  const { MIN_VOLTAGE, MAX_VOLTAGE } = bindActionCreators(actionCreators, dispatch) 
  const [value, setValue] = React.useState([0, 240]);

  const handleChange = (event, newValue) => {
    MIN_VOLTAGE(newValue[0])
    MAX_VOLTAGE(newValue[1])
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
        <Typography id="non-linear-slider" gutterBottom>
            VOLTAGE: {`${value[0]} - ${value[1]} V`}
        </Typography>
        <Slider
        getAriaLabel={() => `VOLTAGE RANGE`}
        value={value}
        min={0}
        max={240}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
