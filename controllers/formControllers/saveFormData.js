const temporaryFormData = require("../../models/formModel/temporaryFormModel");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const b2Client = require("../../connectors/b2Connector/b2Client");
const crypto = require("crypto");
const path = require("path");
require('dotenv').config({ quiet: true, path: path.resolve('../../', '.env') })

const BUCKET = process.env.B2_BUCKET || 'srimsDashboard';
console.log(process.env.B2_BUCKET)
// // Uploads a single multer file (in-memory buffer) to B2.
// // Returns { name, path } where `path` is the object key stored in B2 —
// // NOT a public URL. Use this key later to generate a signed URL for viewing.
// const uploadFileToB2 = async (file) => {
//     if (!file) return { name: null, path: null };

//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, "0");
//     const ext = path.extname(file.originalname).toLowerCase();
//     const key = `${year}/${month}/${crypto.randomUUID()}${ext}`;

//     await b2Client.send(
//         new PutObjectCommand({
//             Bucket: BUCKET,
//             Key: key,
//             Body: file.buffer,
//             ContentType: file.mimetype
//         })
//     );

//     return {
//         name: file.originalname,
//         path: key // store the object key — used later to fetch/sign the file
//     };
// };

// // Runs uploadFileToB2 for every configured document field.
// // Fields with no uploaded file resolve to { name: null, path: null }.
// const uploadAllDocuments = async (req) => {
//     const fieldNames = [
//         "Business_Plan",
//         "Lab_Report",
//         "Logbook_For_Pumping_Hours",
//         "Annual_Audit_Report",
//         "Logbook_For_Consumer_complaint"
//     ];

//     const entries = await Promise.all(
//         fieldNames.map(async (fieldName) => {
//             const file = req.files?.[fieldName]?.[0];
//             const info = await uploadFileToB2(file);
//             return [fieldName, info];
//         })
//     );

//     return Object.fromEntries(entries);
// };

// // Cleanup helper: deletes any files already uploaded to B2.
// // Used when the DB save fails after B2 upload succeeded, to avoid orphaned files.
// const cleanupUploadedFiles = async (documents) => {
//     if (!documents) return;

//     const deletions = Object.values(documents)
//         .filter((doc) => doc?.path)
//         .map((doc) =>
//             b2Client.send(
//                 new DeleteObjectCommand({ Bucket: BUCKET, Key: doc.path })
//             ).catch((err) => {
//                 console.error("Failed to remove orphaned B2 file:", doc.path, err);
//             })
//         );

//     await Promise.all(deletions);
// };

// // Safe JSON parse so malformed input doesn't produce a confusing error message
// const safeParse = (val, fallback = {}) => {
//     try {
//         return val ? JSON.parse(val) : fallback;
//     } catch {
//         return fallback;
//     }
// };

// exports.uploadFormData = async (req, res) => {
//     let uploadedDocuments = null;

//     try {

//         // Basic fields
//         const {
//             name,
//             email,
//             phone,
//             designation,
//             wsucName,
//             province,
//             district,
//             municipality,
//             wardsCovered,
//             geometry
//         } = req.body;

//         // Parse nested JSON objects safely
//         const service_coverage = safeParse(req.body.service_coverage);
//         const adequacy = safeParse(req.body.adequacy);
//         const water_quality = safeParse(req.body.water_quality);
//         const reliability = safeParse(req.body.reliability);
//         const non_revenue_water = safeParse(req.body.non_revenue_water);
//         const operating_ratio = safeParse(req.body.operating_ratio);
//         const metering_ratio = safeParse(req.body.metering_ratio);
//         const grievances_addressal = safeParse(req.body.grievances_addressal);

//         // Geometry parsing
//         const geometryParsed = safeParse(geometry, {});

//         // Upload all provided documents to B2 first.
//         // If this throws, nothing has been written to the DB yet.
//         uploadedDocuments = await uploadAllDocuments(req);

//         const operatorData = {
//             WSUC_Name: wsucName,

//             Operator_Info: {
//                 Name: name || null,
//                 Email: email || null,
//                 Designation: designation || null,
//                 Phone: phone || null
//             },

//             Location: {
//                 Province_Name: province || null,
//                 District_Name: district || null,
//                 Municipality_Name: municipality || null,
//                 Wards_Covered: wardsCovered || null
//             },

//             Service_Coverage_Score: {
//                 KPI_1: service_coverage?.KPI_1 || null,
//                 KPI_1_Remark: service_coverage?.KPI_1_Remark || null,
//                 KPI_2: service_coverage?.KPI_2 || null,
//                 KPI_2_Remark: service_coverage?.KPI_2_Remark || null,
//                 KPI_3: service_coverage?.KPI_3 || null,
//                 KPI_3_Remark: service_coverage?.KPI_3_Remark || null
//             },

//             Adequacy_Score: {
//                 KPI_1: adequacy?.KPI_1 || null,
//                 KPI_1_Remark: adequacy?.KPI_1_Remark || null,
//                 KPI_2: adequacy?.KPI_2 || null,
//                 KPI_2_Remark: adequacy?.KPI_2_Remark || null,
//                 KPI_3: adequacy?.KPI_3 || null,
//                 KPI_3_Remark: adequacy?.KPI_3_Remark || null
//             },

//             Water_Quality_Score: {
//                 KPI_1: water_quality?.KPI_1 || null,
//                 KPI_1_Remark: water_quality?.KPI_1_Remark || null,
//                 KPI_2: water_quality?.KPI_2 || null,
//                 KPI_2_Remark: water_quality?.KPI_2_Remark || null,
//                 KPI_3: water_quality?.KPI_3 || null,
//                 KPI_3_Remark: water_quality?.KPI_3_Remark || null,
//                 KPI_4: water_quality?.KPI_4 || null,
//                 KPI_4_Remark: water_quality?.KPI_4_Remark || null,
//                 KPI_5: water_quality?.KPI_5 || null,
//                 KPI_5_Remark: water_quality?.KPI_5_Remark || null
//             },

//             Reliability_Score: {
//                 KPI_1: reliability?.KPI_1 || null,
//                 KPI_1_Remark: reliability?.KPI_1_Remark || null,
//                 KPI_2: reliability?.KPI_2 || null,
//                 KPI_2_Remark: reliability?.KPI_2_Remark || null
//             },

//             NRW_Score: {
//                 KPI_1: non_revenue_water?.KPI_1 || null,
//                 KPI_1_Remark: non_revenue_water?.KPI_1_Remark || null,
//                 KPI_2: non_revenue_water?.KPI_2 || null,
//                 KPI_2_Remark: non_revenue_water?.KPI_2_Remark || null,
//                 KPI_3: non_revenue_water?.KPI_3 || null,
//                 KPI_3_Remark: non_revenue_water?.KPI_3_Remark || null,
//                 KPI_4: non_revenue_water?.KPI_4 || null,
//                 KPI_4_Remark: non_revenue_water?.KPI_4_Remark || null,
//                 KPI_5: non_revenue_water?.KPI_5 || null,
//                 KPI_5_Remark: non_revenue_water?.KPI_5_Remark || null,
//                 KPI_6: non_revenue_water?.KPI_6 || null,
//                 KPI_6_Remark: non_revenue_water?.KPI_6_Remark || null
//             },

//             OM_Score: {
//                 KPI_1: operating_ratio?.KPI_1 || null,
//                 KPI_1_Remark: operating_ratio?.KPI_1_Remark || null,
//                 KPI_2: operating_ratio?.KPI_2 || null,
//                 KPI_2_Remark: operating_ratio?.KPI_2_Remark || null,
//                 KPI_3: operating_ratio?.KPI_3 || null,
//                 KPI_3_Remark: operating_ratio?.KPI_3_Remark || null
//             },

//             Metering_Ratio_Score: {
//                 KPI_1: metering_ratio?.KPI_1 || null,
//                 KPI_1_Remark: metering_ratio?.KPI_1_Remark || null,
//                 KPI_2: metering_ratio?.KPI_2 || null,
//                 KPI_2_Remark: metering_ratio?.KPI_2_Remark || null
//             },

//             Grievance_Score: {
//                 KPI_1: grievances_addressal?.KPI_1 || null,
//                 KPI_1_Remark: grievances_addressal?.KPI_1_Remark || null,
//                 KPI_2: grievances_addressal?.KPI_2 || null,
//                 KPI_2_Remark: grievances_addressal?.KPI_2_Remark || null
//             },

//             geometry: {
//                 coordinates: geometryParsed.coordinates
//             },

//             Documents: uploadedDocuments
//         };

//         const saveData = await temporaryFormData.create(operatorData);

//         return res.status(201).json({
//             success: true,
//             message: "Data saved successfully",
//             data: saveData
//         });

//     } catch (error) {
//         console.error(error);

//         // Roll back any files already uploaded to B2 since the DB save failed
//         await cleanupUploadedFiles(uploadedDocuments);
//         console.log("Region at upload time:", b2Client.config.region);

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };