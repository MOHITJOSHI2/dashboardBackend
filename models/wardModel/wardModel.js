const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
    {
        Type: {
            type: String,
            default: "Feature",
        },

        Properties: {
            OBJECTID: Number,

            DISTRICT: String,

            GaPa_NaPa: String,

            Type_GN: String,

            NEW_WARD_N: Number,

            STATE_CODE: Number,

            Area_SQKM: Number,

            join_key: String,
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
    },
    {
        timestamps: true,
    }
);


// GEO INDEX
wardSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Ward", wardSchema);