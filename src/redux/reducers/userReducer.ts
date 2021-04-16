const INITIAL_STATE = {
    user: {}
}

type Aksyon = {
    type: string;
    payload: string;
}

export const UserReducer = (state = INITIAL_STATE, action: Aksyon) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: {}
            }
        default:
            return state        
    }
}