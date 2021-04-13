import React, {FC} from 'react'
import {Link} from 'react-router-dom'

import { Button, TextField } from '@material-ui/core'

// CSS
import './login.css'

const LoginPage: FC = () => {
    return (
        <div className="login">
            <form>
                <h1 style={{marginBottom: '1rem'}}> Login </h1>
                <TextField autoFocus={true} label="Email" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField label="Password" variant="outlined" style={{marginBottom: '1rem'}} />
                <Button color="secondary" variant="contained" style={{marginBottom: '0.7rem'}} > Login </Button>
                <Link to="/register" > No account? Register now </Link>
            </form>
        </div>
    )
}

export default LoginPage
