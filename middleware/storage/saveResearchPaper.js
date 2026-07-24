const multer = require("multer");

// Only allow PDF files
const ALLOWED_MIME_TYPES = [
    "application/pdf"
];

// Store files in memory.
// They will be uploaded directly to MinIO in the controller.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(new Error("Only PDF files are allowed."));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }
});

const uploadResearchPaperMiddleware = (req, res, next) => {
    upload.single("Research_Paper")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        next();
    });
};

module.exports = uploadResearchPaperMiddleware;