const temporaryFormData = require("../../models/formModel/temporaryFormModel");

exports.uploadFile = async (req, res) => {
    try {
        //Access Service Provider Details
        const { name, email, phone, designation } = req.body;

        // Access Location Data
        const { province, district, municipality, wardsCovered, coordinates, service_coverage, adequacy, water_quality, reliability, non_revenue_water, operating_ratio, metering_ratio, grievances_addressal } = req.body

        // Access uploaded files
        const documents = req.files.map(file => ({
            originalName: file.originalname,
            fileName: file.filename,
            mimeType: file.mimetype,
            size: file.size,
            relativePath: `${req.uploadFolder}/${file.filename}`,
            uploadedAt: new Date()
        }));

        const operatorData = {
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
                KPI_2: service_coverage.KPI_2,
                KPI_3: service_coverage.KPI_3
            },

            Adequacy_Score: {
                KPI_1: adequacy.KPI_1,
                KPI_2: adequacy.KPI_2
            },

            Water_Quality_Score: {
                KPI_1: water_quality.KPI_1,
                KPI_2: water_quality.KPI_2,
                KPI_3: water_quality.KPI_3,
                KPI_4: water_quality.KPI_4,
                KPI_5: water_quality.KPI_5

            },

            Reliability_Score: {
                KPI_1: reliability.KPI_1,
                KPI_2: reliability.KPI_2
            },

            NRW_Score: {
                KPI_1: non_revenue_water.KPI_1,
                KPI_2: non_revenue_water.KPI_2,
                KPI_3: non_revenue_water.KPI_3,
                KPI_4: non_revenue_water.KPI_4,
                KPI_5: non_revenue_water.KPI_5,
                KPI_6: non_revenue_water.KPI_6
            },

            OM_Score: {
                KPI_1: operating_ratio.KPI_1,
                KPI_2: operating_ratio.KPI_2,
                KPI_3: operating_ratio.KPI_3
            },

            Metering_Ratio_Score: {
                KPI_1: metering_ratio.KPI_1,
                KPI_2: metering_ratio.KPI_2
            },

            Grievance_Score: {
                KPI_1: grievances_addressal.KPI_1,
                KPI_2: grievances_addressal.KPI_2
            },

            //Coordinates of project covered area
            geometry: {
                type: "Polygon",
                coordinates: coordinates
            },

            //All the affiliated data files related to the projects
            Documents: documents
        }

        const saveData = await temporaryFormData.insertOne(operatorData)
        console.log("success")

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}