const { GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const b2Client = require("../../connectors/b2Connector/b2Client");

const BUCKET = 'srimsDashboard'

const getDocuments = async (req, res) => {
    try {
        const { key } = req.query;

        if (!key) {
            return res.status(400).json({ success: false, message: "Missing 'key' query param" });
        }

        // Confirm the object actually exists before generating a URL for it
        try {
            await b2Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
        } catch (headError) {
            return res.status(404).json({ success: false, message: "Document not found in storage" });
        }

        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const url = await getSignedUrl(b2Client, command, { expiresIn: 300 });

        return res.status(200).json({ success: true, url });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getDocuments }