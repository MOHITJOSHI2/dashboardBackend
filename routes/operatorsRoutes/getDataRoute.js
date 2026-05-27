const express = require("express")
const { getData } = require("../../controllers/operatorsControllers/getData")

const Router = express.Router()

Router.get('/getData', getData)

module.exports = Router