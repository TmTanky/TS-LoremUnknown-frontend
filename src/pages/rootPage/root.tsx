import React, { FC } from 'react'

import { Button } from '@material-ui/core'
import Picture1 from '../../imgs/first.png'

// CSS
import './root.css'

const RootPage: FC = () => {
    return (
        <main className="main1" >
            <section className="sect1">
                <h1> Welcome to UnknownLorem </h1>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste similique molestiae magni molestias veritatis illo commodi odit. Ipsum ab magni doloremque ducimus, natus consequatur, nulla inventore accusantium, aut quis quos. </p>
                <Button color="secondary" variant="contained" > Get started </Button>
            </section>

            <section className="sect2" >
                <div className="box1 boxes">
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloremque similique necessitatibus id nihil cumque eaque, ipsam suscipit velit porro? </p>
                </div>

                <div className="box2 boxes">
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloremque similique necessitatibus id nihil cumque eaque, ipsam suscipit velit porro? </p>
                </div>

                <div className="box3 boxes">
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloremque similique necessitatibus id nihil cumque eaque, ipsam suscipit velit porro? </p>
                </div>
            </section>

            <section className="sect3" >
                <div className="pic">
                    <img src={Picture1} alt="a guy with a phone in tall buildings"/>
                </div>

                <div className="info">
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint voluptate aperiam cupiditate unde magni animi quisquam alias, magnam enim laboriosam! Accusamus quos eum blanditiis culpa. </p>
                </div>
            </section>
        </main>
    )
}

export default RootPage