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
        CWPI_Percentage: { type: Number },
        CWPI_Interpretation: { type: String },
        Type_A_to_D: { type: String },
    },
})

module.exports = mongoose.model('WSUC', wsucSchema)