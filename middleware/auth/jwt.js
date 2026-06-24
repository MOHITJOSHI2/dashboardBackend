const jwt = require('jsonwebtoken')
require('dotenv').config({ quiet: true })

const authenticateUsers = (req, res, next) => {
    try {
        const token = req.cookies?.admin

        if (!token) {
            return res.status(401).json({ userErr: "User not authenticated" })
        }

        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) {
                return res.status(401).json({ err: "Wrong token provided" })
            }

            req.user = data
            next()
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ err: "Server error" })
    }
}

module.exports = { authenticateUsers }