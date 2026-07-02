const path = require("path");
const temporaryFormData = require("../../models/formModel/temporaryFormModel");

const STORAGE_ROOT = path.join(__dirname, "../storage");

const getFormData = async (req, res) => {
    //Full path to view and download the files
    // const fullPath = path.join(
    //     STORAGE_ROOT,
    //     document.relativePath
    // );

    try {
        const getFormData = await temporaryFormData.find()
        res.status(200).json({ message: getFormData })

    } catch (error) {
        console.log("Error at getFormData\n", error)
        res.status(500).json({ err: error })
    }

}

const getSingleUserData = async (req, res) => {
    try {
        const userId = req?.params?.id;
        if (userId) {
            const findUserData = await temporaryFormData.findOne({ _id: userId })
            if (findUserData) {
                res.status(200).json({ message: findUserData })
            } else {
                res.status(404).json({ err: "User data not found" })
            }
        } else {
            res.status(404).json({ err: "Cannot find user id" })
        }
    } catch (error) {
        console.log("Error at getFormData\n", error)
        res.status(500).json({ err: error })
    }
}

module.exports = {
    getFormData,
    getSingleUserData
}