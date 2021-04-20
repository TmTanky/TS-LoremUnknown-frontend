import {FC} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

// Interfaces
import { IRootReducer } from '../../redux/reducers/rootReducer';

import MenuIcon from '@material-ui/icons/Menu';
import Slide from '@material-ui/core/Slide';

// CSS
import './sidebar.css'
import { logoutSuccess, userNotLoggedIn } from '../../redux/actions/actions';


const SideBar: FC<{toggle: boolean, setToggle: Function}> = ({toggle, setToggle}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state: IRootReducer) => state.user)
    const isUserLoggedIn = useSelector((state: IRootReducer) => state.isLoggedIn)

    const logoutUser =  async () => {
        await axios.get('https://unknown-lorem-api.herokuapp.com/logout')
    }

    return (
        <div>
            {toggle ? <Slide direction="left" in={toggle} mountOnEnter unmountOnExit>
                <div className="sidebar">
                    <div className="closemenu">
                        <MenuIcon onClick={() => setToggle(!toggle)} style={{cursor: 'pointer', margin: '1rem', color: 'black', marginBottom: '3rem'}}  />
                    </div>
                    <div className="menulists">
                    {isUserLoggedIn ? <h1> {user.user.loggedInUser ? user.user.loggedInUser.username : "Loading"} </h1> : "" }
                        {isUserLoggedIn ? <h1 onClick={() => {
                            dispatch(logoutSuccess())
                            dispatch(userNotLoggedIn())
                            logoutUser()
                        }} > Logout </h1> : <h1 onClick={() => history.push('/login')} > Login </h1> }
                    {!isUserLoggedIn ? <h1 onClick={() => history.push('/about')} > About </h1> : ""}
                    </div>
                </div>
            </Slide> : ""}
        </div>
    )

}

export default SideBar