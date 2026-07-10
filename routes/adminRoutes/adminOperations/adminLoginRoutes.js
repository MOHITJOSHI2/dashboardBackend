//Routes for admin Login
const express = require("express");

const { logout } = require('../../../controllers/adminControllers/adminOperations/adminLogout')
const { adminLogin } = require('../../../controllers/adminControllers/adminOperations/adminLogin')

const router = express.Router();

router.post('/adminLogin', adminLogin)
router.post('/adminLogout', logout)

module.exports = router;