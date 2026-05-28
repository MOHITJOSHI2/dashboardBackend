const express = require("express");
const router = express.Router();

const wardController = require("../controllers/wardController");

router.post("/filter", wardController.getWards);

module.exports = router;