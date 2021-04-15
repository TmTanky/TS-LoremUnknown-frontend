import React, {FC} from 'react'

import { Link } from 'react-router-dom'

// CSS
import "./header.css"

const Header: FC = () => {
    return (
        <nav>
            <div className="navlogo">
                <Link to="/" style={{textDecoration: 'none', color: 'white'}} > <h1> UnknownLorem </h1> </Link>
            </div>

            <div className="navlinks">
                <li> <Link to="/login" > Login </Link> </li>
                <li> <Link to="/about" > About </Link> </li>

            </div>
        </nav>
    )
}

export default Header