const multer = require("multer");

// Allowed file types
const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

// Keep files in memory as buffers instead of writing to local disk 
// they'll be streamed straight to minio in the controller.
const storage = multer.memoryStorage();

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
        files: 5
    }
});

const uploadMiddleware = (req, res, next) => {
    upload.fields([
        { name: "Business_Plan", maxCount: 1 },
        { name: "Lab_Report", maxCount: 1 },
        { name: "Logbook_For_Pumping_Hours", maxCount: 1 },
        { name: "Annual_Audit_Report", maxCount: 1 },
        { name: "Logbook_For_Consumer_complaint", maxCount: 1 }
    ])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        }
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
};

module.exports = uploadMiddleware;