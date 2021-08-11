import {FireBase} from '../config';
import {useState, useContext} from 'react';
import {AuthContext} from "./Auth";
import {Redirect, Link} from "react-router-dom";
import './css/Link.css';

const Read = () => {

  const [info, setInfo] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const [val, setval] = useState(0);

  const Fetchdata = () => {
    FireBase.collection(currentUser.uid).get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = element.data();
        setInfo(arr => [
          ...arr,
          data
        ]);

      });
    })

  }
  if (val === 0) {
    setval(1);
    Fetchdata();
  }
  if (!currentUser) {
    return <Redirect to="/Login"/>;

  }
  return (<div>
    <Link to="/Dashboard" className="btn btn-primary btn-lg active mt-3 mx-3" role="button" aria-pressed="true">Back</Link>
    <center>
      <h2 className="text-white">LIST OF FILES</h2>
    </center>
    <div className="Limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="Table">

            <div className="Row Header">
              <div className="Cell">
                #id
              </div>
              <div className="Cell">
                Type
              </div>
              <div className="Cell">
                Filename
              </div>
              <div className="Cell">
                Date and Time
              </div>
            </div>

            {info.map((data) => (<Frame course={data.filename} name={data.id} age={data.type} time={data.time}/>))}
          </div>
        </div>
      </div>
    </div>
  </div>);
}

const Frame = ({course, name, age, time}) => {
  return (<div className="Row">
    <div className="Cell" data-title="#id">
      {name}
    </div>
    <div className="Cell" data-title="Type">
      {age}
    </div>
    <div className="Cell" data-title="Filename">
      {course}
    </div>
    <div className="Cell" data-title="Date and Time">
      {time}
    </div>
  </div>);
}

export default Read;
