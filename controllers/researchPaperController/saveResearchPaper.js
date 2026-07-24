const crypto = require("crypto");
const path = require("path");

require('dotenv').config({ quiet: true, path: path.resolve('../../', '.env') })

const minioClient = require("../../connectors/minioConnector/minioClient");
const researchPaperModel = require("../../models/researchPaperModel/researchPaperModel");

const BUCKET = process.env.MINIO_RESEARCH_PAPER_BUCKET

const saveResearchPaper = async (req, res) => {
    try {
        const { Publisher } = req.body;

        if (!Publisher) {
            return res.status(400).json({
                success: false,
                message: "Publisher is required."
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Research paper PDF is required."
            });
        }

        // Create a unique object name
        const extension = path.extname(req.file.originalname);
        const objectName = `research-papers/${crypto.randomUUID()}${extension}`;

        // Upload to MinIO
        await minioClient.putObject(
            BUCKET,
            objectName,
            req.file.buffer,
            req.file.size,
            {
                "Content-Type": req.file.mimetype
            }
        );

        // Save metadata in MongoDB
        const researchPaper = await researchPaperModel.create({
            Publisher,
            Document: {
                name: req.file.originalname,
                path: objectName
            }
        });

        return res.status(201).json({
            success: true,
            message: "Research paper uploaded successfully.",
            data: researchPaper
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload research paper."
        });
    }
};

module.exports = {
    saveResearchPaper
};