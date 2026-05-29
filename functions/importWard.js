const fs = require("fs");
const mongoose = require("mongoose");
const Ward = require("../models/wardModel/wardModel");
require('dotenv').config({ quite: true })

mongoose.connect("mongodb+srv://mohitjoshi5523_db_user:9868708712@cluster0.1tjokse.mongodb.net/qgis?appName=Cluster0");

async function importGeoJSON() {
    const data = JSON.parse(
        fs.readFileSync("../data/ward_base.geojson", "utf-8")
    );

    await Ward.deleteMany();

    await Ward.insertMany(data.features);

    console.log("Imported Successfully");

    mongoose.disconnect();
}

importGeoJSON();