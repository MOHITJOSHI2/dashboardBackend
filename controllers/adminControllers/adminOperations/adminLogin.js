const loginModel = require("../../../models/admin/loginModel")
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
                    secure: true,
                    sameSite: "none"
                })
                return res.status(200).json({ message: "Admin logged in successfully" })

            } else {
                res.status(401).json({ err: "Invalid authorization" })
            }
        } else {
            res.status(401).json({ err: "Cannot find user" })
        }

    } catch (error) {
        console.log("error at adminLogin\n", error)
        res.status(500).json({ err: error })
    }
}


module.exports = { adminLogin }