const initial = {
    min: new Date(),
    max: new Date()
}

const timeReducer = (state=initial, action) => {
    switch(action.type) {
        case "minTimeUpdate":
            return {
                ...state,
                min: action.value
            }
        case "maxTimeUpdate":
            return {
                ...state,
                max: action.value
            }
        default:
            return state;
    }
}

export default timeReducer;