//Imported File for database
const db = require("./database/db")
db()

// cookies for authentication
const cookie = require('cookie-parser')


// Imported files for saveData and getData for excell file
const saveData = require('./routes/operatorsRoutes/saveDataRoute')
const getData = require('./routes/operatorsRoutes/getDataRoute')

//Ward coordinates
const getWards = require('./routes/wardRoutes/wardRoutes')

//Form Data
const saveFormData = require('./routes/formRoutes/saveFormDataRoute')
const getFormData = require('./routes/formRoutes/protectedGetFormDataRoutes')

//Admin operations
const adminLogin = require('./routes/adminRoutes/adminLoginRoutes')
const addAdmin = require('./routes/adminRoutes/addAdminRoute')

const formApproval = require('./routes/adminRoutes/formApprovalRoutes/formApprovalRoute')

// Library imports
const express = require('express')
const cors = require('cors')
const { authenticateUsers } = require("./middleware/auth/jwt")
require('dotenv').config({ quiet: true })

//Object Initilization
const app = express()

//Server modifications
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3001',
        'https://hilarious-manatee-0fb305.netlify.app'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookie())

//Operator Routes
app.use('/data', saveData, getData)

//Wards Routes
app.use('/ward', getWards)

//Save formData Routes
app.use('/form', saveFormData)

//Admin accessible route to fetch unapproved form Data
app.use('/form', authenticateUsers, getFormData)

//Admin Login Route
app.use('/auth', adminLogin)

//Add admin route
app.use('/admin', addAdmin)

//Admin Approval or Reject form Data
app.use('/admin', formApproval)


//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
