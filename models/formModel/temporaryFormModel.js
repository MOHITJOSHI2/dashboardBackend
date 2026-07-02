const mongoose = require('mongoose')

const temporaryFormSchema = new mongoose.Schema({
    Status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    Review: {
        Reviewed_By: String,
        Reviewed_At: Date,
        Rejection_Reason: String
    },

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

    // Main Data for Calculating rhe actual Scores
    Service_Coverage_Score: {
        KPI_1: { type: String },
        KPI_2: { type: Number },
        KPI_3: { type: Number }
    },

    Adequacy_Score: {
        KPI_1: { type: Number },
        KPI_2: { type: Number },
    },

    Water_Quality_Score: {
        KPI_1: { type: String },
        KPI_2: { type: String },
        KPI_3: { type: String },
        KPI_4: { type: String },
        KPI_5: { type: String },

    },

    Reliability_Score: {
        KPI_1: { type: String },
        KPI_2: { type: Number },
    },

    NRW_Score: {
        KPI_1: { type: String },
        KPI_2: { type: Number },
        KPI_3: { type: Number },
        KPI_4: { type: Number },
        KPI_5: { type: String },
        KPI_6: { type: String },
    },

    OM_Score: {
        KPI_1: { type: String },
        KPI_2: { type: Number },
        KPI_3: { type: Number },
    },

    Metering_Ratio_Score: {
        KPI_1: { type: Number },
        KPI_2: { type: Number },
    },

    Grievance_Score: {
        KPI_1: { type: String },
        KPI_2: { type: String },
    },

    geometry: {
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

    Documents: {
        type: Array,
    }


})

module.exports = mongoose.model('temporaryFormData', temporaryFormSchema)