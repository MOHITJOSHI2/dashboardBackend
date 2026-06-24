//Routes only accessible by the Admin
const express = require("express");

const {
    getFormData,
    getSingleUserData
} = require("../../controllers/formControllers/getFormData");

const router = express.Router();

router.get('/getFormData', getFormData)
router.get('/getSingleUserData/:id', getSingleUserData)

module.exports = router;