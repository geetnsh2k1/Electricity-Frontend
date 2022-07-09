const initial = {
    min: 0,
    max: 500
}

const powerReducer = (state=initial, action) => {
    switch(action.type) {
        case "minPowerUpdate":
            return {
                ...state,
                min: action.value
            }
        case "maxPowerUpdate":
            return {
                ...state,
                max: action.value
            }
        default:
            return state;
    }
}

export default powerReducer;