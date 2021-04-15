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

export const isUserLoggedIn = () => {
    return {
        type: 'USER_EXIST'
    }
}