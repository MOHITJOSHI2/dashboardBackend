const { extractData } = require('../../functions/dataExtractor.js')
const WSUC = require('../../models/operatorsModel/WSUC.js')

const saveData = async (req, res) => {
    try {
        // Extract Data is function
        const getData = extractData()

        const data = Object.values(getData)

        // Delete previous data
        await WSUC.deleteMany()

        // Insert into database 
        await WSUC.insertMany(data)

        console.log("Data Inserted Successfully")

        res.json({
            message: "New data inserted",
            inserted: data.length
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" })
    }
}

module.exports = { saveData }