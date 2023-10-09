const mongoose = require("mongoose");

const File = mongoose.model(
  "File",
  new mongoose.Schema({
    username: String,
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    newName: String,
    size: Number,
    bucket: String,
    key: String,
    acl: String,
    location: String,
    etag: String,
    tinyurl:String
  })
);

module.exports = File;