import React from 'react';
import {Helmet} from "react-helmet";


const HelmetComponent = (props) => {
    return (
        <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>

        <meta name="description" content={props.title2}/>
        <meta name="keywords" content="AhminaMar1, LaraGatsby, Gatsby"/>

        <meta property="og:site_name" content="Guesschallenge" />
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="ar"/>
        <meta property="og:locale:alternate" content="ar"/>
        <meta property="og:title" content={props.title}/>
        <meta property="og:description" content={props.title2}/>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={props.title}/>
        <meta name="twitter:description" content={props.title2}/>

        <meta property="og:image" content="https://i.ibb.co/gZDLSsx/am.png"/>
        <meta name="twitter:image:src" content="https://i.ibb.co/gZDLSsx/am.png"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Changa&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
      </Helmet>
    );
};

export default HelmetComponent;