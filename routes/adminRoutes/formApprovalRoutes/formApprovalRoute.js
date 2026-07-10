//Routes for admin Login
const express = require("express");

const { approveFormData, rejectFormData } = require('../../../controllers/adminControllers/formReviewController/formReview')

const router = express.Router();

router.post('/approve/:id', approveFormData)
router.post('/reject/:id', rejectFormData)

module.exports = router;