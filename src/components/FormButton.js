import React from 'react';

const FormButton = (props) =>{
   return(
    <div id="button" className="row">
    <button type={props.type} disabled={props.captcha} >{props.title} </button>
  </div> 

)};
export default FormButton;