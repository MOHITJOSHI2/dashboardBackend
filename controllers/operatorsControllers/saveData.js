const { extractData } = require('../../functions/dataExtractor.js')
const WSUC = require('../../models/operatorsModel/WSUC.js')

const saveData = async (req, res) => {
    try {
        // Extract Data is function
        const getData = extractData()

        const data = Object.values(getData)

        // Get last WSUC_ID
        const lastEntry = await WSUC.findOne().sort({ WSUC_ID: -1 })

        let lastID = 0
        if (lastEntry) {
            lastID = lastEntry.WSUC_ID
        }

        // Filter only new records
        const newData = data.filter(row => row.WSUC_ID > lastID)

        if (newData.length === 0) {
            return res.json({
                message: "No new data to insert"
            })
        }
        // Insert into database 
        await WSUC.insertMany(newData)

        console.log("Data Inserted Successfully")

        res.json({
            message: "New data inserted",
            inserted: newData.length
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" })
    }
}

module.exports = { saveData }