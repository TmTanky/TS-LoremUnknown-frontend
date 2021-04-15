type Aksyon = {
    type: string;
    payload: string
}

export const isUserLoggedIn = (state = false, action: Aksyon) => {
    switch (action.type) {
        case 'USER_EXIST':
            return state = true
        case 'USER_NOT_EXIST':
            return state = false
        default:
            return state       
    }
}