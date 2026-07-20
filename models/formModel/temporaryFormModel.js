const mongoose = require('mongoose')

const temporaryFormSchema = new mongoose.Schema({
    WSUC_Name: { type: String },

    Status: {
        type: String,
        enum: ["Pending"],
        default: "Pending"
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
        KPI_1_Remark: { type: String },
        KPI_2: { type: Number },
        KPI_2_Remark: { type: String },
        KPI_3: { type: Number },
        KPI_3_Remark: { type: String },
    },

    Adequacy_Score: {
        KPI_1: { type: String },
        KPI_1_Remark: { type: String },
        KPI_2: { type: Number },
        KPI_2_Remark: { type: String },
        KPI_3: { type: Number },
        KPI_3_Remark: { type: String }
    },

    Water_Quality_Score: {
        KPI_1: { type: String },
        KPI_1_Remark: { type: String },
        KPI_2: { type: String },
        KPI_2_Remark: { type: String },
        KPI_3: { type: String },
        KPI_3_Remark: { type: String },
        KPI_4: { type: String },
        KPI_4_Remark: { type: String },
        KPI_5: { type: String },
        KPI_5_Remark: { type: String },

    },

    Reliability_Score: {
        KPI_1: { type: String },
        KPI_1_Remark: { type: String },
        KPI_2: { type: Number },
        KPI_2_Remark: { type: String },
    },

    NRW_Score: {
        KPI_1: { type: String },
        KPI_1_Remark: { type: String },
        KPI_2: { type: Number },
        KPI_2_Remark: { type: String },
        KPI_3: { type: Number },
        KPI_3_Remark: { type: String },
        KPI_4: { type: Number },
        KPI_4_Remark: { type: String },
        KPI_5: { type: String },
        KPI_5_Remark: { type: String },
        KPI_6: { type: String },
        KPI_6_Remark: { type: String },
    },

    OM_Score: {
        KPI_1: { type: String },
        KPI_1_Remark: { type: String },
        KPI_2: { type: Number },
        KPI_2_Remark: { type: String },
        KPI_3: { type: Number },
        KPI_3_Remark: { type: String },
    },

    Metering_Ratio_Score: {
        KPI_1: { type: Number },
        KPI_1_Remark: { type: String },
        KPI_2: { type: Number },
        KPI_2_Remark: { type: String },
    },

    Grievance_Score: {
        KPI_1: { type: String },
        KPI_1_Remark: { type: String },
        KPI_2: { type: String },
        KPI_2_Remark: { type: String },
    },

    geometry: {
        type: {
            type: String,
            enum: ["Polygon", "MultiPolygon"],
            default: "Polygon",
        },

        coordinates: {
            type: Array,
        },
    },

    Documents: {
        Business_Plan: {
            name: { type: String, default: null },
            path: { type: String, default: null }
        },
        Lab_Report: {
            name: { type: String, default: null },
            path: { type: String, default: null }
        },
        Logbook_For_Pumping_Hours: {
            name: { type: String, default: null },
            path: { type: String, default: null }
        },
        Annual_Audit_Report: {
            name: { type: String, default: null },
            path: { type: String, default: null }
        },
        Logbook_For_Consumer_complaint: {
            name: { type: String, default: null },
            path: { type: String, default: null }
        }
    },
},
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('temporaryFormData', temporaryFormSchema)