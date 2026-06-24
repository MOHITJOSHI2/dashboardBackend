//Routes for admin Login
const express = require("express");

const { addAdmin } = require('../../controllers/adminControllers/adminLogin')

const router = express.Router();

router.post('/addAdmin', addAdmin)

module.exports = router;