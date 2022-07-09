export const MIN_VOLTAGE = (value) => {
    return (dispatch) => {
        dispatch({
            type: "minVoltageUpdate",
            value: value
        })
    }
}

export const MAX_VOLTAGE = (value) => {
    return (dispatch) => {
        dispatch({
            type: "maxVoltageUpdate",
            value: value
        })
    }
}

export const MIN_CURRENT = (value) => {
    return (dispatch) => {
        dispatch({
            type: "minCurrentUpdate",
            value: value
        })
    }
}

export const MAX_CURRENT = (value) => {
    return (dispatch) => {
        dispatch({
            type: "maxCurrentUpdate",
            value: value
        })
    }
}

export const MIN_TIME = (value) => {
    return (dispatch) => {
        dispatch({
            type: "minTimeUpdate",
            value: value
        })
    }
}

export const MAX_TIME = (value) => {
    return (dispatch) => {
        dispatch({
            type: "maxTimeUpdate",
            value: value
        })
    }
}

export const MIN_POWER = (value) => {
    return (dispatch) => {
        dispatch({
            type: "minPowerUpdate",
            value: value
        })
    }
}

export const MAX_POWER = (value) => {
    return (dispatch) => {
        dispatch({
            type: "maxPowerUpdate",
            value: value
        })
    }
}

export const UPDATE_READING = (value) => {
    return (dispatch) => {
        dispatch({
            type: "updateReading",
            value: value
        })
    }
}