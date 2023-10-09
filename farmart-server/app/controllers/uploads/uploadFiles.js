const tinyurl = require("tinyurl");
const config = require("../../config/auth.config");
const db = require("../../models");
var TinyURL = require('tinyurl');

const File = db.file;
const api_uploadFiles = (req, res) => {
    //res.status(200);
    //console.log(req.body,req.files);
    var turl="url";
    var pres=res;
    TinyURL.shorten(req.files[0].location).then(function(res) {
        turl=res;

        const file = new File({
            username:req.body.username,
            fieldname: req.files[0].fieldname,
            originalname: req.files[0].originalname,
            encoding: req.files[0].encoding,
            mimetype: req.files[0].mimetype,
            newName: req.files[0].newName,
            size: req.files[0].size,
            bucket: req.files[0].bucket,
            key: req.files[0].key,
            acl: req.files[0].acl,
            location: req.files[0].location,
            etag: req.files[0].etag,
            tinyurl:turl
          });
        
          file.save((err, file) => {
            if (err) {
              pres.status(500).send({ message: err });
              return;
            }
            pres.json({
                msg: "Uploaded! and saved to MongoDB", 
                files: req.files
            });
        });

    }, function(err) {
        console.log(err)
    })
    return;
}

module.exports = api_uploadFiles;