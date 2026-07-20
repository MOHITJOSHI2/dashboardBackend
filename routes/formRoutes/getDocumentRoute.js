// routes/documents.routes.js
const express = require("express");
const router = express.Router();
const { getDocuments } = require("../../controllers/formControllers/getDocuments");

// GET /form/fetchDocument?key=2026/07/uuid.pdf
router.get("/fetchDocument", getDocuments);

module.exports = router;