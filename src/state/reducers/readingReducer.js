const initial = {
    id: 1,
    data: []
}
const readingReducer = (state=initial, action) => {
    switch(action.type) {
        case "updateReading":
            return {
                ...state,
                data: action.value
            }
        default:
            return state
    }
}
export default readingReducer;