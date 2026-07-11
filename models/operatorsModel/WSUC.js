const mongoose = require('mongoose')

const wsucSchema = new mongoose.Schema({
    WSUC_ID: { type: Number, unique: true },
    WSUC_Name: { type: String },


    Location: {
        Province_Name: { type: String },
        District_Name: { type: String },
        Municipality_Type: { type: String },
        Municipality_Name: { type: String },
        Wards_Covered: { type: Array },
    },

    Service_Coverage_Prerequisite: { type: String },

    Summary_Index: {
        Service_Coverage_Score: { type: Number },
        Adequacy_Score: { type: Number },
        Water_Quality_Score: { type: Number },
        Reliability_Score: { type: Number },
        NRW_Score: { type: Number },
        OM_Score: { type: Number },
        Metering_Ratio_Score: { type: Number },
        Grievance_Score: { type: Number },
        SPI: { type: Number },
        OEI: { type: Number },
    },

    Master_Sheet: {
        HH_Served: { type: Number },
        Total_HH: { type: Number },
        Coverage_Pct: { type: Number },
        Coverage_Score: { type: Number },
        Scheme_Type: { type: String },
        Billed_Volume: { type: String },
        Population_Served: { type: Number },
        Actual_LPCD: { type: Number },
        Target_LPCD: { type: Number },
        WQ_Testing: { type: String },
        WQ_EColi: { type: String },
        WQ_Arsenic: { type: String },
        Hours_of_Supply: { type: Number },
        NRW_Logbook: { type: String },
        NRW_Flow_Measurement: { type: String },
        NRW_Reservoir_Scale: { type: String },
        NRW_Flow_Meters: { type: String },
        NRW_DMA: { type: String },
        Expenditure: { type: Number },
        Income: { type: Number },
        Operating_Ratio: { type: Number },
        Metered_Connections: { type: Number },
        Total_Connections: { type: Number },
        Metering_Pct: { type: Number },
        Grievance_Logbook: { type: String },
        Grievance_Mechanism: { type: String },
        Category_Number: { type: String },
        Category_Level: { type: String },
        Project_Status: { type: String }
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
    }


})

module.exports = mongoose.model('WSUC', wsucSchema)