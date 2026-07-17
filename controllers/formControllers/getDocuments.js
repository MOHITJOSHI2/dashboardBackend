const minioClient = require("../../connectors/minioConnector/minioClient");

const BUCKET = process.env.MINIO_BUCKET;

const getDocuments = async (req, res) => {
    try {
        const { key } = req.query;

        if (!key) {
            return res.status(400).json({
                success: false,
                message: "Missing 'key' query parameter."
            });
        }

        // Check if object exists
        let stat;

        try {
            stat = await minioClient.statObject(BUCKET, key);
        } catch (err) {
            return res.status(404).json({
                success: false,
                message: "Document not found."
            });
        }

        // Get object stream
        const stream = await minioClient.getObject(BUCKET, key);

        const contentType =
            stat.metaData["content-type"] || "application/octet-stream";

        const fileName = key.split("/").pop();

        res.setHeader("Content-Type", contentType);

        // View PDFs in browser, download everything else
        if (contentType === "application/pdf") {
            res.setHeader(
                "Content-Disposition",
                `inline; filename="${fileName}"`
            );
        } else {
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${fileName}"`
            );
        }

        stream.pipe(res);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDocuments
};