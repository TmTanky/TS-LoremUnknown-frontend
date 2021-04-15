import {combineReducers} from 'redux'

// Reducers
import {UserReducer} from './userReducer'
import {isUserLoggedIn} from './isLoggedInReducer'

export interface IRootReducer {
    user: string;
    isLoggedIn: boolean;
}

export const rootReducer = combineReducers({
    user: UserReducer,
    isLoggedIn: isUserLoggedIn
})