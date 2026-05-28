const Ward = require("../models/Ward");

exports.getWards = async (req, res) => {
    try {
        const {
            province,
            district,
            municipality,
            wards,
        } = req.body;

        let query = {};

        // Province
        if (province) {
            query["properties.STATE_CODE"] = province;
        }

        // District
        if (district) {
            query["properties.DISTRICT"] = {
                $regex: `^${district}$`,
                $options: "i",
            };
        }

        if (municipality) {
            query["properties.GaPa_NaPa"] = {
                $regex: `^${municipality}$`,
                $options: "i",
            };
        }

        // Wards array [1,2,3]
        if (wards && wards.length > 0) {
            query["properties.NEW_WARD_N"] = {
                $in: wards,
            };
        }

        const wardData = await Ward.find(query);

        res.status(200).json({
            type: "FeatureCollection",
            features: wardData,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};