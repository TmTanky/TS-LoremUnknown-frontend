import React, {FC} from 'react'

// CSS
import './about.css'

const AboutPage: FC = () => {

    return (
        <div className="aboutbox">
            <h1> UnknownLorem </h1>
            <p style={{marginBottom: '0.5rem'}} > This project is also to my last project <strong> Social-Lorem </strong> but created with <strong> Typescript </strong> </p>
            <p> This web application is a <strong> MERN </strong> stack also comes with the power of <strong> Typescript </strong>. <strong> Typescript </strong> is a powerful tool that significantly improves the reliability of the javascript code. If you have any suggestions you can post it thank you and godbless. </p>
            <ul style={{marginTop: '1rem'}} >
                <h2 style={{marginTop: '0.5rem'}} > Technology Stack: </h2>
                <li> Mongo DB </li>
                <li> Express </li>
                <li> React JS </li>
                <li> Node JS </li>
                <li> Typescript </li>
            </ul>
        </div>
    )

}

export default AboutPage