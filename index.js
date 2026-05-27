//Imported File for database
const db = require("./database/db")
db()
// Imported files for saveData and getData for excell file
const saveData = require('./routes/operatorsRoutes/saveDataRoute')
const getData = require('./routes/operatorsRoutes/getDataRoute')

// Library imports
const express = require('express')
const cors = require('cors')
require('dotenv').config({ quiet: true })

//Object Initilization
const app = express()

//Server modifications
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

//Routes
app.use('/data', saveData, getData)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})