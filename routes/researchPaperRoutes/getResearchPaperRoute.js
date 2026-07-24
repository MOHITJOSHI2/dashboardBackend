const express = require("express");
const {
    getResearchPapers
} = require("../../controllers/researchPaperController/getResearchPaper");

const router = express.Router();

router.get(
    "/getResearchPaper", getResearchPapers
);

module.exports = router;