import React from "react";
import "./DisplayContainer.css";
const axios = require('axios');

export default function DisplayCard(props) {
  const {
    mimetype,
    originalname,
    tinyurl,
    size,
    newName
  } = props.data;
  const [val,setVal] = props.values;
  const handleCange =  ()=>{
    let data = JSON.stringify({
      "newName": newName
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:4050/deletedata',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setVal(1-val);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="displayCard">
      
      <div className="internalCard">
        <h1>{mimetype}</h1>
      </div>
      <div className="internalCard">
        <div className="arrangeCard">
          <div className="oveflow">{originalname}</div>
          <a href={tinyurl}>
            <div className="oveflow">{tinyurl}</div>
          </a>
          
          
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div>Size : {size} Bytes</div>
              <button type="button" className="btn btn-dark" style={{marginLeft:"auto"}} onClick={handleCange}>delete</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
