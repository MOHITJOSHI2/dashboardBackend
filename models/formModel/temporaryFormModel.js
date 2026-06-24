const mongoose = require('mongoose')

const temporaryFormSchema = new mongoose.Schema({
    Operator_Info: {
        Name: { type: String },
        Email: { type: String },
        Designation: { type: String },
        Phone: { type: String },
    },

    Location: {
        Province_Name: { type: String },
        District_Name: { type: String },
        Municipality_Name: { type: String },
        Wards_Covered: { type: Array },
    },

    Geometry: {
        type: {
            type: String,
            enum: ["Polygon", "MultiPolygon"],
            required: true,
        },

        coordinates: {
            type: Array,
            required: true,
        },
    },

    // MasterData: {

    // },

    Documents: {
        type: Array,
    }


})

module.exports = mongoose.model('temporaryFormData', temporaryFormSchema)