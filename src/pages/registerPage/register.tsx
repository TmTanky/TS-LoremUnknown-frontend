import React, {ChangeEvent, FC, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// Interfaces
import { Iregister, Ierrors } from '../../interface/interfaces'

// Redux
import { loginSuccess, isUserLoggedIn } from '../../redux/actions/actions'

// CSS
import './register.css'

const RegisterPage: FC = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [register, setRegister] = useState<Iregister>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    })

    const [open, setOpen] = useState<boolean>(false)
    const [registerError, setRegisterError] = useState<Ierrors>({
        errors: []
    })

    const registerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const {name, value} = e.target

        setRegister({
            ...register,
            [name]: value
        })

    }

    const submitRegister: () => void = async () => {
        
        const {data} = await axios.post('http://localhost:8000/register', register, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (data.msg) {
            setRegisterError({
                errors: [data.msg]
            })
            setOpen(true)
        } else {
            dispatch(isUserLoggedIn())
            dispatch(loginSuccess(data))
            history.push('/home')
        }

    }

    return (
        <div className="register">
            <form>
                <h1 style={{marginBottom: '1rem'}}> Register </h1>

                {registerError.errors.length > 0 ? registerError.errors.map(err => {
                        return <Collapse in={open} key={err} style={{marginBottom: '1rem'}} >
                            <Alert severity="warning" action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            >
                            {err}
                            </Alert>
                        </Collapse>
                    }): ""}

                <TextField type="text" autoFocus={true} name="firstName" onChange={registerOnChange} label="First Name" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField type="text" label="Last Name" name="lastName" onChange={registerOnChange} variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField type="text" label="Username" name="username" onChange={registerOnChange} variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField type="email" label="Email" name="email" onChange={registerOnChange} variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField type="password" label="Password" name="password" onChange={registerOnChange} variant="outlined" style={{marginBottom: '1rem'}} />
                <Button onClick={submitRegister} color="secondary" variant="contained" style={{marginBottom: '0.7rem'}} > Register </Button>
                <Link to="/login" > Have an account? Login now </Link>
            </form>
        </div>
    )

}

export default RegisterPage