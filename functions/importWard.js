const fs = require("fs");
const mongoose = require("mongoose");
const Ward = require("../models/wardModel/wardModel");
require('dotenv').config({ quiet: true })

mongoose.connect();

async function importGeoJSON() {
    const data = JSON.parse(
        fs.readFileSync("../data/ward_base.geojson", "utf-8")
    );

    const validFeatures = data.features.filter(
        (f) =>
            f.geometry &&
            ["Polygon", "MultiPolygon"].includes(f.geometry.type) &&
            f.geometry.coordinates
    );

    console.log(`Total features: ${data.features.length}, valid: ${validFeatures.length}, skipped: ${data.features.length - validFeatures.length}`);

    await Ward.deleteMany();

    await Ward.insertMany(validFeatures, { ordered: false });

    console.log("Imported Successfully");

    mongoose.disconnect();
}

importGeoJSON();