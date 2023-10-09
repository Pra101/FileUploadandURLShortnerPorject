import React from "react";
import "./DisplayContainer.css";
import DisplayCard from "./DisplayCard";
import FilesService from "../services/files.service";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useReducer } from "react";
import axios from 'axios';

export default function DisplayContainer() {

  const [content, setContent] = useState([]);
  const { user} = useSelector((state) => state.auth);
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [val,setVal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const values= [val,setVal];
  useEffect(() => {
    FilesService.getFilesForDisplay(user.username).then(
      (response) => {
        //console.log(Array.isArray(response.data));
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  useEffect(() => {
    FilesService.getFilesForDisplay(user.username).then(
      (response) => {
        //console.log(Array.isArray(response.data));
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, [val,uploadProgress]);

  console.log(content);

  //---------------------------------------

  const [file, setFile] = useState();
  

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:4050/upload';
    const formData = new FormData();
    formData.append('input_files', file);
    formData.append('username',user.username)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: function(progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      }
    };

    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setVal(1-val);
        
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
     // forceUpdate();
  }



  return (
    <>
      <div id="displayCont">
        <div className="" style={{paddingTop : "10px"}}>
          <div id="displayInfoNav" className="border border-success">
            <div id="storageInfo" className="d-flex flex-row">
              <form onSubmit={handleSubmit} className="sideBarOptions">
                  <input type="file" onChange={handleChange}/>
                <button type="submit" className="btn btn-dark" >upload</button>
              </form>
            </div>
          </div>
          <progress className="progresssize" value={uploadProgress} max="100"></progress>
        </div>

        <div id="contentDisplayer">
          {
            content.map((cont)=>{return (<DisplayCard data={cont} key={cont._id} values={values} />)})
          }  
        </div>
      </div>
    </>
  );
}
