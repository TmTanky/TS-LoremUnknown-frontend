import React, {FC} from 'react'
import {Link} from 'react-router-dom'

import { Button, TextField } from '@material-ui/core'

// CSS
import './register.css'

const RegisterPage: FC = () => {

    return (
        <div className="register">
            <form>
                <h1 style={{marginBottom: '1rem'}}> Register </h1>
                <TextField autoFocus={true} label="First Name" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField label="Last Name" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField label="Username" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField label="Email" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField label="Password" variant="outlined" style={{marginBottom: '1rem'}} />
                <Button color="secondary" variant="contained" style={{marginBottom: '0.7rem'}} > Register </Button>
                <Link to="/login" > Have an account? Login now </Link>
            </form>
        </div>
    )

}

export default RegisterPage