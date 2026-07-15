const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const b2Client = require("../../connectors/b2Connector/b2Client");
const path = require('path')
require('dotenv').config({ quiet: true, path: path.resolve('../../', '.env') })

const BUCKET = process.env.B2_BUCKET;

// GET /form/getDocument?key=2026/07/uuid.pdf
const getDocuments = async (req, res) => {
    try {
        const { key } = req.query;

        if (!key) {
            return res.status(400).json({ success: false, message: "Missing 'key' query param" });
        }

        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: key
        });

        // URL valid for 5 minutes — regenerate on each view rather than storing it
        const url = await getSignedUrl(b2Client, command, { expiresIn: 300 });

        return res.status(200).json({ success: true, url });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getDocuments }