const temporaryFormData = require("../../models/formModel/temporaryFormModel");
const fs = require("fs");

// Helper now takes `req` and the field name, and returns both name + path
const getFileInfo = (req, fieldName) => {
    const file = req.files?.[fieldName]?.[0];

    if (!file) {
        return { name: null, path: null };
    }

    return {
        name: file.originalname,
        // Store a relative path (not the absolute filesystem path)
        // req.uploadFolder was set in the multer middleware, e.g. "2026/07"
        path: `${req.uploadFolder}/${file.filename}`
    };
};

// Cleanup helper: deletes any files multer already wrote to disk
// Used when something fails after upload but before the DB save succeeds
const cleanupUploadedFiles = (req) => {
    if (!req.files) return;

    Object.values(req.files)
        .flat()
        .forEach((file) => {
            fs.unlink(file.path, (err) => {
                if (err) console.error("Failed to remove orphaned file:", file.path, err);
            });
        });
};

// Safe JSON parse so malformed input doesn't produce a confusing error message
const safeParse = (val, fallback = {}) => {
    try {
        return val ? JSON.parse(val) : fallback;
    } catch {
        return fallback;
    }
};

exports.uploadFile = async (req, res) => {
    try {

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
            geometry
        } = req.body;

        // Parse nested JSON objects safely
        const service_coverage = safeParse(req.body.service_coverage);
        const adequacy = safeParse(req.body.adequacy);
        const water_quality = safeParse(req.body.water_quality);
        const reliability = safeParse(req.body.reliability);
        const non_revenue_water = safeParse(req.body.non_revenue_water);
        const operating_ratio = safeParse(req.body.operating_ratio);
        const metering_ratio = safeParse(req.body.metering_ratio);
        const grievances_addressal = safeParse(req.body.grievances_addressal);

        //Geometry parsing
        const geometryParsed = JSON.parse(geometry)

        const operatorData = {
            WSUC_Name: wsucName,

            Operator_Info: {
                Name: name || null,
                Email: email || null,
                Designation: designation || null,
                Phone: phone || null
            },

            Location: {
                Province_Name: province || null,
                District_Name: district || null,
                Municipality_Name: municipality || null,
                Wards_Covered: wardsCovered || null
            },

            Service_Coverage_Score: {
                KPI_1: service_coverage?.KPI_1 || null,
                KPI_1_Remark: service_coverage?.KPI_1_Remark || null,
                KPI_2: service_coverage?.KPI_2 || null,
                KPI_2_Remark: service_coverage?.KPI_2_Remark || null,
                KPI_3: service_coverage?.KPI_3 || null,
                KPI_3_Remark: service_coverage?.KPI_3_Remark || null
            },

            Adequacy_Score: {
                KPI_1: adequacy?.KPI_1 || null,
                KPI_1_Remark: adequacy?.KPI_1_Remark || null,
                KPI_2: adequacy?.KPI_2 || null,
                KPI_2_Remark: adequacy?.KPI_2_Remark || null
            },

            Water_Quality_Score: {
                KPI_1: water_quality?.KPI_1 || null,
                KPI_1_Remark: water_quality?.KPI_1_Remark || null,
                KPI_2: water_quality?.KPI_2 || null,
                KPI_2_Remark: water_quality?.KPI_2_Remark || null,
                KPI_3: water_quality?.KPI_3 || null,
                KPI_3_Remark: water_quality?.KPI_3_Remark || null,
                KPI_4: water_quality?.KPI_4 || null,
                KPI_4_Remark: water_quality?.KPI_4_Remark || null,
                KPI_5: water_quality?.KPI_5 || null,
                KPI_5_Remark: water_quality?.KPI_5_Remark || null
            },

            Reliability_Score: {
                KPI_1: reliability?.KPI_1 || null,
                KPI_1_Remark: reliability?.KPI_1_Remark || null,
                KPI_2: reliability?.KPI_2 || null,
                KPI_2_Remark: reliability?.KPI_2_Remark || null
            },

            NRW_Score: {
                KPI_1: non_revenue_water?.KPI_1 || null,
                KPI_1_Remark: non_revenue_water?.KPI_1_Remark || null,
                KPI_2: non_revenue_water?.KPI_2 || null,
                KPI_2_Remark: non_revenue_water?.KPI_2_Remark || null,
                KPI_3: non_revenue_water?.KPI_3 || null,
                KPI_3_Remark: non_revenue_water?.KPI_3_Remark || null,
                KPI_4: non_revenue_water?.KPI_4 || null,
                KPI_4_Remark: non_revenue_water?.KPI_4_Remark || null,
                KPI_5: non_revenue_water?.KPI_5 || null,
                KPI_5_Remark: non_revenue_water?.KPI_5_Remark || null,
                KPI_6: non_revenue_water?.KPI_6 || null,
                KPI_6_Remark: non_revenue_water?.KPI_6_Remark || null
            },

            OM_Score: {
                KPI_1: operating_ratio?.KPI_1 || null,
                KPI_1_Remark: operating_ratio?.KPI_1_Remark || null,
                KPI_2: operating_ratio?.KPI_2 || null,
                KPI_2_Remark: operating_ratio?.KPI_2_Remark || null,
                KPI_3: operating_ratio?.KPI_3 || null,
                KPI_3_Remark: operating_ratio?.KPI_3_Remark || null
            },

            Metering_Ratio_Score: {
                KPI_1: metering_ratio?.KPI_1 || null,
                KPI_1_Remark: metering_ratio?.KPI_1_Remark || null,
                KPI_2: metering_ratio?.KPI_2 || null,
                KPI_2_Remark: metering_ratio?.KPI_2_Remark || null
            },

            Grievance_Score: {
                KPI_1: grievances_addressal?.KPI_1 || null,
                KPI_1_Remark: grievances_addressal?.KPI_1_Remark || null,
                KPI_2: grievances_addressal?.KPI_2 || null,
                KPI_2_Remark: grievances_addressal?.KPI_2_Remark || null
            },

            geometry: {
                coordinates: {
                    geometryParsed
                },
            },

            Documents: {
                Business_Plan: getFileInfo(req, "Business_Plan"),
                Lab_Report: getFileInfo(req, "Lab_Report"),
                Logbook_For_Pumping_Hours: getFileInfo(req, "Logbook_For_Pumping_Hours"),
                Annual_Audit_Report: getFileInfo(req, "Annual_Audit_Report"),
                Logbook_For_Consumer_complaint: getFileInfo(req, "Logbook_For_Consumer_complaint")
            }
        };

        const saveData = await temporaryFormData.create(operatorData);

        return res.status(201).json({
            success: true,
            message: "Data saved successfully",
            data: saveData
        });

    } catch (error) {
        console.error(error);

        // Remove any files multer already wrote to disk, since the DB save failed
        cleanupUploadedFiles(req);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};