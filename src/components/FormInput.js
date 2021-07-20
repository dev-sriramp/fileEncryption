import React from 'react';

const FormInput = (props) =>{
   return(
        <div className="row">
          <label>{props.description}</label>
          <input type={props.type} placeholder={props.placeholder} name={props.name}/>
        </div>  

)};

export default FormInput;