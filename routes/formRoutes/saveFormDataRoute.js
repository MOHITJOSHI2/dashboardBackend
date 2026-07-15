const express = require("express");

const uploadMiddleware = require("../../middleware/storage/multer");
const {
    uploadFormData
} = require("../../controllers/formControllers/saveFormData");

const router = express.Router();

router.post(
    "/upload", uploadMiddleware, uploadFormData
);

module.exports = router;