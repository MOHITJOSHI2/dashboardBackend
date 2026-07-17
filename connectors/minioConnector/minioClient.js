const Minio = require("minio");
const path = require("path");

require("dotenv").config({
    quiet: true,
    path: path.resolve("../../", ".env"),
});

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: Number(process.env.MINIO_PORT || 9000),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

module.exports = minioClient;