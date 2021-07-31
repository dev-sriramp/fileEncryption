import React from 'react';

const FormButton = (props) =>{
   return(
    <div id="button" className="row">
    <button type={props.type} >{props.title} </button>
  </div> 

)};
const FormInput = (props) =>{
  return(
       <div className="row">
         <label>{props.description}</label>
         <input type={props.type} placeholder={props.placeholder} name={props.name} className={props.className}/>
       </div>  

)};
const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);
export {FormHeader}
export {FormInput}
export default FormButton;