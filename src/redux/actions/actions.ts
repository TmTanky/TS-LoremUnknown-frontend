export interface IUserData {
    status: number;
    loggedInUser: string;
    token: string;
    msg?: string | null
}

export const loginSuccess = (data: IUserData) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const isUserLoggedIn = () => {
    return {
        type: 'USER_EXIST'
    }
}

export const userNotLoggedIn = () => {
    return {
        type: 'USER_NOT_EXIST'
    }
}