const WSUC = require('../../models/operatorsModel/WSUC')

const getData = async (req, res) => {
    try {
        const data = await WSUC.find()

        if (data.length > 0) {
            res.json({
                message: "Data Fetched successfully",
                data: data
            })
        } else {
            res.json({ message: "No data to fetch" })
        }
    } catch (error) {
        console.log("Error at getData \n", error)
    }
}

module.exports = { getData }