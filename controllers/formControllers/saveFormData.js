const temporaryFormData = require("../../models/formModel/temporaryFormModel");

exports.uploadFile = async (req, res) => {
    try {
        //Access Service Provider Details
        const { name, email, phone, designation, wsucName } = req?.body;

        // Access Location Data
        const { province, district, municipality, wardsCovered, latitude, longitude, service_coverage, adequacy, water_quality, reliability, non_revenue_water, operating_ratio, metering_ratio, grievances_addressal } = req?.body

        // // Access uploaded files
        // const documents = req.files.map(file => ({
        //     originalName: file.originalname,
        //     fileName: file.filename,
        //     mimeType: file.mimetype,
        //     size: file.size,
        //     relativePath: `${req.uploadFolder}/${file.filename}`,
        //     uploadedAt: new Date()
        // }));

        const operatorData = {
            WSUC_Name: wsucName,

            //Operator Personal Info
            Operator_Info: {
                Name: name,
                Email: email,
                Designation: designation,
                Phone: phone
            },

            //Spatial Data of the projects
            Location: {
                Province_Name: province,
                District_Name: district,
                Municipality_Name: municipality,
                Wards_Covered: wardsCovered
            },

            // Main Data for Calculating rhe actual Scores
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
                KPI_2_Remark: adequacy.KPI_2_Remark,
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
                KPI_5_Remark: water_quality.KPI_5_Remark,

            },

            Reliability_Score: {
                KPI_1: reliability.KPI_1,
                KPI_1_Remark: reliability.KPI_1_Remark,
                KPI_2: reliability.KPI_2,
                KPI_2_Remark: reliability.KPI_2_Remark,
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
                KPI_6_Remark: non_revenue_water.KPI_6_Remark,
            },

            OM_Score: {
                KPI_1: operating_ratio.KPI_1,
                KPI_1_Remark: operating_ratio.KPI_1_Remark,
                KPI_2: operating_ratio.KPI_2,
                KPI_2_Remark: operating_ratio.KPI_2_Remark,
                KPI_3: operating_ratio.KPI_3,
                KPI_3_Remark: operating_ratio.KPI_3_Remark,
            },

            Metering_Ratio_Score: {
                KPI_1: metering_ratio.KPI_1,
                KPI_1_Remark: metering_ratio.KPI_1_Remark,
                KPI_2: metering_ratio.KPI_2,
                KPI_2_Remark: metering_ratio.KPI_2_Remark,
            },

            Grievance_Score: {
                KPI_1: grievances_addressal.KPI_1,
                KPI_1_Remark: grievances_addressal.KPI_1_Remark,
                KPI_2: grievances_addressal.KPI_2,
                KPI_2_Remark: grievances_addressal.KPI_2_Remark,
            },

            //Coordinates of project covered area
            geometry: {
                lat: latitude,
                lng: longitude
            },

            //All the affiliated data files related to the projects
            Documents: []
        }

        const saveData = await temporaryFormData.insertOne(operatorData)
        console.log("success")

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
}