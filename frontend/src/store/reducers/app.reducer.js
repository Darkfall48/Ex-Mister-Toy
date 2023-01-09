
const initialState = {
    count: 101
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 }
        case 'DECREMENT':
            return { ...state, count: state.count - 1 }
        case 'CHANGE_BY':
            return { ...state, count: state.count + action.diff }

        default:
            return state
    }
}
