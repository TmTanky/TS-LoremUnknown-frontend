import React, {FC} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

// Interfaces
import { IRootReducer } from '../../redux/reducers/rootReducer'

// Redux
import { logoutSuccess, userNotLoggedIn } from '../../redux/actions/actions'

// CSS
import "./header.css"

const Header: FC = () => {

    const dispatch = useDispatch()
    const isUserLoggedIn = useSelector((state: IRootReducer) => state.isLoggedIn)
    const user = useSelector((state: IRootReducer) => state.user)

    const logoutUser =  async () => {
        await axios.get('http://localhost:8000/logout')
    }

    return (
        <nav>
            <div className="navlogo">
                <Link to="/" style={{textDecoration: 'none', color: 'white'}} > <h1> UnknownLorem </h1> </Link>
            </div>

            <div className="navlinks">
                {isUserLoggedIn ? <li> <Link to="/login" > {user.user.loggedInUser ? user.user.loggedInUser.username : "Loading"} </Link> </li> : "" }
                {isUserLoggedIn ? <li> <Link to="#" onClick={() => {
                    dispatch(logoutSuccess())
                    dispatch(userNotLoggedIn())
                    logoutUser()
                }} > Logout </Link> </li> : <li> <Link to="/login" > Login </Link> </li> }
                {!isUserLoggedIn ? <li> <Link to="/about" > About </Link> </li> : ""}

            </div>
        </nav>
    )
}

export default Header