import React from 'react';
import {Helmet} from "react-helmet";


const HelmetComponent = (props) => {
    return (
        <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Changa&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
      </Helmet>
    );
};

export default HelmetComponent;