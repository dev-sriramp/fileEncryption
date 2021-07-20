import React from 'react';
import {Link } from "react-router-dom";
const OtherComponents = (props) =>{
    return(
<div className="alternativeLogin">
    <h4>{props.value}</h4>
    <Link to=
    {props.link}>{props.name}</Link> 
    
  </div>
    )
}


export default OtherComponents;