const Ward = require("../../models/wardModel/wardModel");

exports.getWards = async (req, res) => {
    try {
        const {
            province,
            district,
            municipality,
            wards,
        } = req.body;

        let query = {};

        if (province) {
            query["properties.STATE_CODE"] = province;
        }

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

        // Require wards explicitly — return empty if not provided
        if (!wards || wards.length === 0) {
            return res.status(200).json({
                type: "FeatureCollection",
                features: [],
            });
        }

        query["properties.NEW_WARD_N"] = { $in: wards };

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