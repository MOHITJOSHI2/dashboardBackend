const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: "Feature",
        },

        properties: {
            OBJECTID: Number,

            DISTRICT: String,

            GaPa_NaPa: String,

            Type_GN: String,

            NEW_WARD_N: Number,

            STATE_CODE: Number,

            Area_SQKM: Number,

            join_key: String,
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
    },
    {
        timestamps: true,
    }
);


// GEO INDEX
wardSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Ward", wardSchema);