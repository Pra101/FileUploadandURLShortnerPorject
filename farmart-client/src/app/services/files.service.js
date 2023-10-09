import axios from "axios";

const API_URL = "http://localhost:4050/";

const getFilesForDisplay = async (cusername) => {
    
    let data = JSON.stringify({
        "username": cusername
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API_URL + "listuserdata",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return await axios.request(config);
};

const FilesService = {
    getFilesForDisplay,
}

export default FilesService;
