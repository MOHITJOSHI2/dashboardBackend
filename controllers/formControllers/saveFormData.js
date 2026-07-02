const temporaryFormData = require("../../models/formModel/temporaryFormModel");

exports.uploadFile = async (req, res) => {
    try {
        console.log(req.body);

        // Basic fields
        const {
            name,
            email,
            phone,
            designation,
            wsucName,
            province,
            district,
            municipality,
            wardsCovered,
            latitude,
            longitude
        } = req.body;

        // Parse nested JSON objects safely
        const service_coverage = req.body.service_coverage ? JSON.parse(req.body.service_coverage) : {};
        const adequacy = req.body.adequacy ? JSON.parse(req.body.adequacy) : {};
        const water_quality = req.body.water_quality ? JSON.parse(req.body.water_quality) : {};
        const reliability = req.body.reliability ? JSON.parse(req.body.reliability) : {};
        const non_revenue_water = req.body.non_revenue_water ? JSON.parse(req.body.non_revenue_water) : {};
        const operating_ratio = req.body.operating_ratio ? JSON.parse(req.body.operating_ratio) : {};
        const metering_ratio = req.body.metering_ratio ? JSON.parse(req.body.metering_ratio) : {};
        const grievances_addressal = req.body.grievances_addressal ? JSON.parse(req.body.grievances_addressal) : {};

        const operatorData = {
            WSUC_Name: wsucName,

            Operator_Info: {
                Name: name,
                Email: email,
                Designation: designation,
                Phone: phone
            },

            Location: {
                Province_Name: province,
                District_Name: district,
                Municipality_Name: municipality,
                Wards_Covered: wardsCovered
            },

            Service_Coverage_Score: {
                KPI_1: service_coverage.KPI_1,
                KPI_1_Remark: service_coverage.KPI_1_Remark,
                KPI_2: service_coverage.KPI_2,
                KPI_2_Remark: service_coverage.KPI_2_Remark,
                KPI_3: service_coverage.KPI_3,
                KPI_3_Remark: service_coverage.KPI_3_Remark
            },

            Adequacy_Score: {
                KPI_1: adequacy.KPI_1,
                KPI_1_Remark: adequacy.KPI_1_Remark,
                KPI_2: adequacy.KPI_2,
                KPI_2_Remark: adequacy.KPI_2_Remark
            },

            Water_Quality_Score: {
                KPI_1: water_quality.KPI_1,
                KPI_1_Remark: water_quality.KPI_1_Remark,
                KPI_2: water_quality.KPI_2,
                KPI_2_Remark: water_quality.KPI_2_Remark,
                KPI_3: water_quality.KPI_3,
                KPI_3_Remark: water_quality.KPI_3_Remark,
                KPI_4: water_quality.KPI_4,
                KPI_4_Remark: water_quality.KPI_4_Remark,
                KPI_5: water_quality.KPI_5,
                KPI_5_Remark: water_quality.KPI_5_Remark
            },

            Reliability_Score: {
                KPI_1: reliability.KPI_1,
                KPI_1_Remark: reliability.KPI_1_Remark,
                KPI_2: reliability.KPI_2,
                KPI_2_Remark: reliability.KPI_2_Remark
            },

            NRW_Score: {
                KPI_1: non_revenue_water.KPI_1,
                KPI_1_Remark: non_revenue_water.KPI_1_Remark,
                KPI_2: non_revenue_water.KPI_2,
                KPI_2_Remark: non_revenue_water.KPI_2_Remark,
                KPI_3: non_revenue_water.KPI_3,
                KPI_3_Remark: non_revenue_water.KPI_3_Remark,
                KPI_4: non_revenue_water.KPI_4,
                KPI_4_Remark: non_revenue_water.KPI_4_Remark,
                KPI_5: non_revenue_water.KPI_5,
                KPI_5_Remark: non_revenue_water.KPI_5_Remark,
                KPI_6: non_revenue_water.KPI_6,
                KPI_6_Remark: non_revenue_water.KPI_6_Remark
            },

            OM_Score: {
                KPI_1: operating_ratio.KPI_1,
                KPI_1_Remark: operating_ratio.KPI_1_Remark,
                KPI_2: operating_ratio.KPI_2,
                KPI_2_Remark: operating_ratio.KPI_2_Remark,
                KPI_3: operating_ratio.KPI_3,
                KPI_3_Remark: operating_ratio.KPI_3_Remark
            },

            Metering_Ratio_Score: {
                KPI_1: metering_ratio.KPI_1,
                KPI_1_Remark: metering_ratio.KPI_1_Remark,
                KPI_2: metering_ratio.KPI_2,
                KPI_2_Remark: metering_ratio.KPI_2_Remark
            },

            Grievance_Score: {
                KPI_1: grievances_addressal.KPI_1,
                KPI_1_Remark: grievances_addressal.KPI_1_Remark,
                KPI_2: grievances_addressal.KPI_2,
                KPI_2_Remark: grievances_addressal.KPI_2_Remark
            },

            geometry: {
                lat: latitude,
                lng: longitude
            },

            Documents: []
        };

        const saveData = await temporaryFormData.create(operatorData);

        return res.status(201).json({
            success: true,
            message: "Data saved successfully",
            data: saveData
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};