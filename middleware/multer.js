const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Allowed file types
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");

        // Save for later use in controller
        req.uploadFolder = `${year}/${month}`;

        const uploadPath = path.join(
            __dirname,
            "../storage",
            year.toString(),
            month
        );

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();

        cb(null, `${crypto.randomUUID()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(new Error("Only PDF and DOCX files are allowed."));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
        files: 10
    }
});

const uploadMiddleware = (req, res, next) => {
    upload.array("documents", 10)(req, res, (err) => {
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

module.exports = uploadMiddleware;