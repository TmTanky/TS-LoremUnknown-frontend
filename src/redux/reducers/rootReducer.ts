import {combineReducers} from 'redux'

// Interfaces
import { IcurrentUser } from '../../interface/interfaces'

// Reducers
import {UserReducer} from './userReducer'
import {isUserLoggedIn} from './isLoggedInReducer'

export interface IRootReducer {
    user: {
        user: IcurrentUser
    }
    isLoggedIn: boolean;
}

export const rootReducer = combineReducers({
    user: UserReducer,
    isLoggedIn: isUserLoggedIn
})