//Routes for admin Login
const express = require("express");

const { adminLogin, logout } = require('../../controllers/adminControllers/adminLogin')

const router = express.Router();

router.post('/adminLogin', adminLogin)
router.post('/adminLogout', logout)

module.exports = router;