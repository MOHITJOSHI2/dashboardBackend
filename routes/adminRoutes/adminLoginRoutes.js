//Routes for admin Login
const express = require("express");

const { adminLogin } = require('../../controllers/adminControllers/adminLogin')

const router = express.Router();

router.post('/adminLogin', adminLogin)

module.exports = router;