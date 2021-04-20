import React, { FC } from 'react'
import {useHistory} from 'react-router-dom'

import { Button } from '@material-ui/core'
import Picture1 from '../../imgs/first.png'

// CSS
import './root.css'

const RootPage: FC = () => {

    const history = useHistory()

    return (
        <main className="main1" >
            <section className="sect1">
                <h1> Welcome to UnknownLorem </h1>
                <p> A place where you can communicate with other people. It's the next generation application! </p>
                <Button style={{marginTop: '1rem'}} onClick={() => {
                    history.push('/register')
                }} color="secondary" variant="contained" > Get started </Button>
            </section>

            <section className="sect2" >
                <div className="box1 boxes">
                    <p> You can create a post, edit and delete!  </p>
                </div>

                <div className="box2 boxes">
                    <p> You can hide your name just by activating the hide name switch. </p>
                </div>

                <div className="box3 boxes">
                    <p> You can comment on a post, and also like a comment! </p>
                </div>
            </section>

            <section className="sect3" >
                <div className="pic">
                    <img src={Picture1} alt="a guy with a phone in tall buildings"/>
                </div>

                <div className="info">
                    <p> This web application is a MERN stack also comes with the power of Typescript. Typescript is a powerful tool that significantly improves the reliability of the javascript code. </p>
                </div>
            </section>
        </main>
    )
}

export default RootPage