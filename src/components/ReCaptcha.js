import React,{useState} from 'react';
import Recaptcha from 'react-recaptcha';

const ReCaptcha = () =>{
    const [verified, isVerified] = useState(false);
    const VerifyUser = () =>{
        if(verified){
        alert(verified);
        }
        }
    const verifyCallback = (response) =>{
        if(response){
            isVerified(true);
        }

    }

return(
    <Recaptcha sitekey="6LeALqsbAAAAAC8NXLLR916tG2tbTA3ADZsyKwVl"
    render="explicit" onloadCallback={VerifyUser} 
    verifyCallback={verifyCallback}
    />
);
};

export default ReCaptcha;