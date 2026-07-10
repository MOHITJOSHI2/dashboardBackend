const loginModel = require("../../../models/admin/loginModel")

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

module.exports = { addAdmin }