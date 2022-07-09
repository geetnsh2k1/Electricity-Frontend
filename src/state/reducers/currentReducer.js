const initial = {
    min: 0,
    max: 10
}

const currentReducer = (state=initial, action) => {
    switch(action.type) {
        case "minCurrentUpdate":
            return {
                ...state,
                min: action.value
            }
        case "maxCurrentUpdate":
            return {
                ...state,
                max: action.value
            }
        default:
            return state
    }
}

export default currentReducer;