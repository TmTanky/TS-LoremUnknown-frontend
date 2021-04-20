import React, {ChangeEvent, FC, useState} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Interfaces
import { Ilogin } from '../../interface/interfaces'
import { IUserData } from '../../redux/actions/actions'

import { Button, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

// Interfaces
import { Ierrors } from '../../interface/interfaces'

// Redux
import { loginSuccess, isUserLoggedIn } from '../../redux/actions/actions'

// CSS
import './login.css'

const LoginPage: FC = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [login, setLogin] = useState<Ilogin>({
        email: "",
        password: ""
    })
    const [loginError, setLoginError] = useState<Ierrors>({
        errors: []
    })

    const [open, setOpen] = useState<boolean>(false)

    const loginOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        const {value, name} = e.target

        setLogin({
            ...login,
            [name]: value
        })

    }

    const loginSubmit = async () => {
        
        try {

            const {data} = await axios.post<IUserData>('https://unknown-lorem-api.herokuapp.com/login', login, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (data.msg) {
                setLoginError({
                    errors: [data.msg]
                })
                setOpen(true)
            } else {
                dispatch(isUserLoggedIn())
                dispatch(loginSuccess(data))
                history.push('/home')
            }
 
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="login">
            <form>
                <h1 style={{marginBottom: '1rem'}}> Login </h1>

                    {loginError.errors.length > 0 ? loginError.errors.map(err => {
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

                <TextField autoFocus={true} type="text" name="email" onChange={loginOnChange} label="Email" variant="outlined" style={{marginBottom: '1rem'}} />
                <TextField label="Password" type="password" name="password" onChange={loginOnChange} variant="outlined" style={{marginBottom: '1rem'}} />
                <Button onClick={loginSubmit} color="secondary" variant="contained" style={{marginBottom: '0.7rem'}} > Login </Button>
                <Link to="/register" > No account? Register now </Link>
            </form>
        </div>
    )
}

export default LoginPage
