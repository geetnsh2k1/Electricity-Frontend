import React, { useState } from "react";
import DateTime from "./DateTime"
import LoadingButton from "@mui/lab/LoadingButton";
import Chart from "./Chart";

import VoltageSlider from "./voltageScroller"
import CurrentSlider from "./currentScroller";
import PowerSlider from "./powerScroller";
import NavBar from "./NavBar";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/actions/actionCreators";

const columns = [
  { field: 'turned_on', headerName: 'turned_on', width: 130 },
  { field: 'current', headerName: 'current(A)', width: 130 },
  { field: 'power', headerName: 'power(W)', width: 130 },
  { field: 'voltage', headerName: 'voltage(V)', width: 130 },
  { field: 'span', headerName: 'span(hr)', width: 130 },
];

function App() {

  const state = useSelector((state) => state)
  const [loader, setLoader] = useState(false)
  const [reading, setReadings] = useState([])

  const dispatch = useDispatch();
  const { UPDATE_READING } = bindActionCreators(actionCreators, dispatch);

  const handleSearch = (event) => {
    setLoader(true);
    console.log(Math.round(state.time["min"].getTime()/1000), Math.round(state.time["max"].getTime()/1000))
    var data = { 
      "1": {
        "key": "voltage",
        "operation": "gte",
        "value": state.voltage["min"]
      },
      "2": {
        "key": "voltage",
        "operation": "lte",
        "value": state.voltage["max"]
      },
      "3": {
        "key": "current",
        "operation": "gte",
        "value": state.current["min"]
      },
      "4": {
        "key": "current",
        "operation": "lte",
        "value": state.current["max"]
      },
      "5": {
        "key": "power",
        "operation": "gte",
        "value": state.power["min"]
      },
      "6": {
        "key": "power",
        "operation": "lte",
        "value": state.power["max"]
      },
      "7": {
        "key": "turned_on",
        "operation": "gte",
        "value": Math.round(state.time["min"].getTime()/1000)
      },
      "8": {
        "key": "turned_on",
        "operation": "lte",
        "value": Math.round(state.time["max"].getTime()/1000)
      },
    }
    axios({
      method: "POST",
      url: "https://snieah51ma.execute-api.ap-south-1.amazonaws.com/v1/readings",
      data: JSON.stringify(data)
    })
    .then((resp) => {
      if(resp['status'] === 200) {
        data = []
        for(var i=0; i<resp['data'].length; i++) {
          var read = resp['data'][i]
          read['id'] = i 
          read['turned_on'] = new Date(read['turned_on']*1000).toISOString()
          read['span'] = read['span'] / 3600
          read['span'] = `${parseFloat(read['span']).toFixed(2)}` 
          data.push(read)
        }
        setReadings(data)
        setLoader(false);
        UPDATE_READING(data);
      } 
    })
    .catch((err) => {
      console.log(err)
      setLoader(false);
    })
  }

  return (
    <div >
    <NavBar></NavBar>
    <div style={{"margin":"2.5% 0%", "width": "100%"}}>
      
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <DateTime props={{"min": true, "max": false, "title": "From"}}></DateTime> 
        <DateTime props={{"min": false, "max": true, "title": "To"}}></DateTime> 
        <VoltageSlider/>
        <CurrentSlider/>
        <PowerSlider/>

        <LoadingButton style={{width: '80px', height: '50px', marginTop: '5px'}} loading variant="contained"  onClick={handleSearch} loading={loader}>
          GET
        </LoadingButton>

      </div>
    
      <div style={{ margin: "5% 21%", height: 400 }}>
        <DataGrid
          rows={reading}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      { reading.length ? 
        <Chart></Chart>
      : "" }
    </div>
    </div>
  );
}

export default App;
