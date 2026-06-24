const express = require("express");

const uploadMiddleware = require("../../middleware/multer");
const {
    uploadFile
} = require("../../controllers/formControllers/saveFormData");

const router = express.Router();

router.post(
    "/upload", uploadMiddleware, uploadFile
);

module.exports = router;