//Routes for admin Login
const express = require("express");

const { approveFormData, rejectFormData } = require('../../../controllers/adminControllers/formReviewController.js/formReview')

const router = express.Router();

router.post('/approve', approveFormData)
router.post('/reject', rejectFormData)

module.exports = router;