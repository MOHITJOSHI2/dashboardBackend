const express = require("express");

const uploadResearchPaper = require("../../../middleware/storage/saveResearchPaper");
const {
    saveResearchPaper
} = require("../../../controllers/researchPaperController/saveResearchPaper");

const router = express.Router();

router.post(
    "/uploadResearchPaper", uploadResearchPaper, saveResearchPaper
);

module.exports = router;