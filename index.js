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
const fetchDocunets = require('./routes/formRoutes/getDocumentRoute')

//Admin operations
const adminLogin = require('./routes/adminRoutes/adminOperations/adminLoginRoutes')
const adminLogout = require('./routes/adminRoutes/adminOperations/adminLoginRoutes')
const addAdmin = require('./routes/adminRoutes/adminOperations/addAdminRoute')


//Form reject or accept routes
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
        'https://srims-dashboard.netlify.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))
app.use(express.json())
app.use(cookie())

//Operator or projects Routes
app.use('/data', saveData, getData)

//Wards Route
app.use('/ward', getWards)

//Save formData Routes
app.use('/form', saveFormData)

//Admin accessible route to fetch unapproved form Data and documents
app.use('/form', authenticateUsers, getFormData, fetchDocunets)

//Admin Login and logout Route
app.use('/auth', adminLogin, adminLogout)

//Add admin route
app.use('/admin', addAdmin)

//Admin Approval or Reject form Data
app.use('/admin', formApproval)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
