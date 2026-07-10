//Routes for admin Login
const express = require("express");

const { addAdmin } = require('../../../controllers/adminControllers/adminOperations/addAdmin')

const router = express.Router();

router.post('/addAdmin', addAdmin)

module.exports = router;