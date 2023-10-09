const { authJwt } = require("../middlewares");
const handleUploadMiddleware  = require('../controllers/uploads/uploadSetup');
const api_uploadFiles             = require("../controllers/uploads/uploadFiles");
const api_deleteFiles             = require('../controllers/uploads/deleteFiles');
const api_ListFiles               = require('../controllers/uploads/listFiles');
const {userFiles,deleteFile}      = require('../controllers/file.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/ping", (req,res)=>{
        res.send("Pong");
    });

    app.post('/upload',
        handleUploadMiddleware.array('input_files', 5), 
        api_uploadFiles
    );

    //app.get('/list', api_ListFiles);

    app.get('/pingauth',[authJwt.verifyToken],(req,res)=>{
      res.send("Pong with auth");
    })

    app.post('/listuserdata',userFiles);

    app.post('/deletedata',deleteFile)
  
    //app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  
    // app.get(
    //   "/api/test/mod",
    //   [authJwt.verifyToken, authJwt.isModerator],
    //   controller.moderatorBoard
    // );
  
    // app.get(
    //   "/api/test/admin",
    //   [authJwt.verifyToken, authJwt.isAdmin],
    //   controller.adminBoard
    // );
  };
    
    // router.get('/ping', (req: Request, res: Response) => {
    //     res.send('pong');
    // });

    // // Accept maximum 5 files


    // router.delete('/remove', api_deleteFiles);
    