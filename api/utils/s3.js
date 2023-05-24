const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        ACL: "public-read",
        Key: fileName,
        ContentType: mimetype,
    };

    return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

module.exports = {
    uploadFile,
    deleteFile,
};
