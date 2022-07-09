import voltageReducer from "./voltageReducer";
import currentReducer from "./currentReducer";
import powerReducer from "./powerReducer";
import timeReducer from "./timeReducer";
import readingReducer from "./readingReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    voltage: voltageReducer,
    current: currentReducer,
    power: powerReducer,
    time: timeReducer,
    reading: readingReducer
})

export default reducers;