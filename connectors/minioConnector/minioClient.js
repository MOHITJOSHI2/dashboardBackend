const Minio = require("minio");
const path = require("path");

require("dotenv").config({
    quiet: true,
    path: path.resolve("../../", ".env"),
});


//Connecting to minIO client locally with data that is in .env
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost", //localhost and if not woking network Ip address
    port: Number(process.env.MINIO_PORT || 9000), // Local minIO port
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY, // minIO username
    secretKey: process.env.MINIO_SECRET_KEY, // minIO password
});

module.exports = minioClient;