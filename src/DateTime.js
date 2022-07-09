import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/actions/actionCreators"


export default function MaterialUIPickers({props}) {
  const [value, setValue] = React.useState(new Date());

  const dispatch = useDispatch();
  const { MIN_TIME, MAX_TIME } = bindActionCreators(actionCreators, dispatch) 

  const handleChange = (newValue) => {
    setValue(newValue);
    if(props.min) MIN_TIME(newValue);
    else MAX_TIME(newValue)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
