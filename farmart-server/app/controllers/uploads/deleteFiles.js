const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4'
});
const S3 = new AWS.S3({
    s3ForcePathStyle: true
});

const api_deleteFiles = (req, res) => {
    const {fileKeys} = req.body;

    if(!fileKeys || !Array.isArray(fileKeys) || (fileKeys && fileKeys.length == 0)) {
        res.status(400);
        return res.json({error: 'Error! File keys not found.'})
    }

    const deleteParam = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
            Objects: fileKeys.map((key) => ({Key: key}))
        }
    };    
    S3.deleteObjects(deleteParam, function(err, data) {
        if (err) throw err;

        res.status(200);
        return res.json({msg: 'Deleted!'});
    });
}

module.exports= api_deleteFiles;