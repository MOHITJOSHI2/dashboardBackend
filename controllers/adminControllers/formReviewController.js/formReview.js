const WSUC = require('../../../models/operatorsModel/WSUC')
const temporaryFormData = require('../../../models/formModel/temporaryFormModel')

const approveFormData = async (req, res) => {
    try {
        const { id } = req.params;

        const formData = await temporaryFormData.findById(id);

        if (!formData) {
            return res.status(404).json({
                message: "Form not found"
            });
        }

        const wsucPayload = {
            Location: formData.Location,
            geometry: formData.geometry,
            Documents: formData.Documents,
        };

        const wsuc = await WSUC.create(wsucPayload);

        await temporaryFormData.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Form approved successfully",
            data: wsuc
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Approval failed",
            error: error.message
        });
    }
};

const rejectFormData = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason, AdminName } = req.body;

        const form = await temporaryFormData.findById(id);

        if (!form) {
            return res.status(404).json({
                message: "Form not found"
            });
        }

        form.Status = "Rejected";

        form.Review = {
            Reviewed_By: AdminName,
            Reviewed_At: new Date(),
            Rejection_Reason: reason
        };

        await form.save();

        return res.status(200).json({
            message: "Form rejected successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error rejecting form",
            error: error.message
        });
    }
};

module.exports = {
    approveFormData,
    rejectFormData
}