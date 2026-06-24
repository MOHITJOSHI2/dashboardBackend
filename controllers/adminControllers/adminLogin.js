const loginModel = require("../../models/admin/loginModel")
const jwt = require('jsonwebtoken')
require('dotenv').config({ quiet: true })

const adminLogin = async (req, res) => {
    const { userName, password } = req.body
    try {

        const adminData = await loginModel.findOne({
            User_Name: userName,
            Password: password
        })

        if (adminData) {
            const tokenData = {
                userName: adminData.User_Name
            }

            const jwtToken = jwt.sign(tokenData, process.env.SECRET, { expiresIn: "24h" })
            if (jwtToken) {
                res.cookie('admin', jwtToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    secure: true
                })
                return res.status(200).json({ message: "Admin logged in successfully" })

            } else {
                res.status(500).json({ err: "Server error" })
            }
        } else {
            res.status(404).json({ err: "Cannot find user" })
        }

    } catch (error) {
        console.log("error at adminLogin\n", error)
        res.status(500).json({ err: error })
    }
}


const addAdmin = async (req, res) => {
    const { userName, password } = req.body

    try {
        const checkAdmin = await loginModel.findOne({ User_Name: userName })
        if (checkAdmin) {
            return res.status(400).json({ err: "User Already Exists" })
        }

        const newAdmin = new loginModel({
            User_Name: userName,
            Password: password
        })

        await newAdmin.save()
        res.status(201).json({ message: "New Admin added" })

    } catch (error) {
        console.log("error at addAdmin\n", error)
        res.status(500).json({ err: error })
    }
}

module.exports = {
    adminLogin,
    addAdmin
}