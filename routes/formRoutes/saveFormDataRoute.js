const express = require("express");

const uploadMiddleware = require("../../middleware/storage/multer");
const {
    uploadFile
} = require("../../controllers/formControllers/saveFormData");

const router = express.Router();

// router.post(
//     "/upload", uploadMiddleware, uploadFile
// );

router.post(
    "/upload", uploadFile
);

module.exports = router;