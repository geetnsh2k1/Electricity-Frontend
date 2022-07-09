const initial = {
    min: 0,
    max: 240
}

const voltageReducer = (state=initial, action) => {
    switch(action.type) {
        case "minVoltageUpdate":
            return {
                ...state,
                min: action.value
            }
        case "maxVoltageUpdate":
            return {
                ...state,
                max: action.value
            }
        default:
            return state
    }
}

export default voltageReducer;