const { S3Client } = require("@aws-sdk/client-s3");
const path = require('path')
require('dotenv').config({ quiet: true, path: path.resolve('../../', '.env') })


const b2Client = new S3Client({
    endpoint: 'https://s3.us-east-005.backblazeb2.com',
    region: process.env.B2_REGION || 'us-east-005',
    credentials: {
        accessKeyId: '0055ecf20e6e55d0000000003',
        secretAccessKey: 'K0059uBmntswKiNfnheNQreMnuY6u0w'
    }
});

module.exports = b2Client;