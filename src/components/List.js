import {FireBase} from '../config';
import { useState,useContext } from 'react';
import { AuthContext } from "./Auth";
import { Redirect,Link} from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

  
const Read = () => {
  
    const [info , setInfo] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [val,setval] = useState(0);
    
  
    const Fetchdata = ()=>{
        FireBase.collection(currentUser.uid).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
                  
            });
        })

    }
if(val === 0){
    setval(1);
    Fetchdata();
}
  if (!currentUser) {
    return <Redirect to="/Login" />;

  }
    return (
        <div>
            <Link to="/Dashboard" className="btn btn-primary btn-lg active mt-3 mx-3" role="button" aria-pressed="true">Back</Link>
            <center>
            <h2 className="text-white">LIST OF FILES</h2>
            </center>
            <MDBTable hover responsive>
      <MDBTableHead>
        <tr className="text-white">
          <th scope='col'>#ID</th>
          <th scope='col'>TYPE</th>
          <th scope='col'>FILENAME</th>
          <th scope='col'>DATE and TIME</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {
            info.map((data) => (
            <Frame course={data.filename} 
                   name={data.id} 
                   age={data.type}
                   time = {data.time}/>
            ))
        }
      </MDBTableBody>
    </MDBTable>
        </div>
    );
}
  
const Frame = ({course , name , age,time}) => {
    return (
<tr className="text-white" key = {name}>        
<td> {name}</td>
<td> {age}</td>
<td> {course}</td>
<td> {time}</td>
</tr>
    );
}
  
export default Read;