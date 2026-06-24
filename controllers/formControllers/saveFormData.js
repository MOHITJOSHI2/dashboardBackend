const temporaryFormData = require("../../models/formModel/temporaryFormModel");

exports.uploadFile = async (req, res) => {
    try {
        //Access Service Provider Details
        const { name, email, phone, designation } = req.body;

        // Access Location Data
        const { province, district, wardsCovered, coordinates, service_coverage, adequacy, water_quality, reliability, non_revenue_water, operating_ratio, metering_ratio, grievances_addressal } = req.body

        // Access uploaded files
        const documents = req.files.map(file => ({
            originalName: file.originalname,
            fileName: file.filename,
            mimeType: file.mimetype,
            size: file.size,
            relativePath: `${req.uploadFolder}/${file.filename}`,
            uploadedAt: new Date()
        }));

        const dummydata = {
            Operator_Info: {
                Name: "Mohit Joshi",
                Email: "itsspyner@gmail.com",
                Designation: "sub engineer",
                Phone: "987654321"
            },

            Geometry: {
                type: "Polygon",
                coordinates: [1, 3]
            },
            Documents: documents
        }

        const saveData = await temporaryFormData.insertOne(dummydata)
        console.log("success")

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}