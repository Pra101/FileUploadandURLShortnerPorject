const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    signatureVersion: 'v4'
});
const S3 = new AWS.S3({
    s3ForcePathStyle: true
});

const api_ListFiles = (req, res) => {
    const folderName = process.env.AWS_PUBLIC_FOLDER;

    if(!folderName) {
        res.status(400);
        return res.json({error: 'Error! Folder name is missing.'})
    }

    const listParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: folderName?.toString() || '/'
    };  
    S3.listObjectsV2(listParams, function(err, data) {
        if (err) throw err;
        
        if(data.Contents && data.Contents.length > 0) {
                                                
            const fileObjArr = [];
            data.Contents.forEach((fileObj) => { // fileObj: S3.ObjectList
                if(fileObj.Size > 0) {
                    fileObjArr.push({
                        ...fileObj,
                        // Url generating suggestion from => http://www.wryway.com/blog/aws-s3-url-styles/
                        location: `https://${process.env.AWS_BUCKET_NAME}${process.env.AWS_REGION === 'eu-central-1' ? '.' : '-'}s3${process.env.AWS_REGION === 'us-east-1' ? '' : '-' + process.env.AWS_REGION}.amazonaws.com/${fileObj.Key}`
                    })
                }
            })

            data.Contents = fileObjArr;

        }

        res.status(200);
        return res.json({data});
    });
}

module.exports = api_ListFiles;