const initialData = {
    loading: false
}

export function alertsReducers(state = initialData, actions) {
    switch (actions.type) {
        case 'LOADING': {
            return {
                ...state,
                loading: actions.payload
            }
        };

        default: return state;
    }
}