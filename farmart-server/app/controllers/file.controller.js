const db = require("../models");
const File = db.file;

exports.userFiles = (req, res) => {
    File.find({username : req.body.username})
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not Found" });
    else res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error" });
    });
    //res.send("hello")
};

exports.deleteFile = (req, res) => {
    File.deleteMany({newName : req.body.newName})
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not Found" });
    else res.send({message : "Deleted File"});
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error" });
    });
    //res.send("hello")
};