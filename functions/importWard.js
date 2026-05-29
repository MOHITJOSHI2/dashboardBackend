const fs = require("fs");
const mongoose = require("mongoose");
const Ward = require("../models/wardModel/wardModel");
require('dotenv').config({ quite: true })

mongoose.connect(process.env.MONGO_URI);

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