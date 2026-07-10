const WSUC = require('../../../models/operatorsModel/WSUC')
const temporaryFormData = require('../../../models/formModel/temporaryFormModel');
const sendMessageToUser = require('../../../functions/email/sendEmail');
const {
    adequacyScore,
    grievanceAddressal,
    meteringRatio,
    nrwScore,
    omScore,
    reliabilityScore,
    serviceCoverageScore,
    waterQualityScore
} = require('../../../functions/operationalIndicators/operationIndicatorsCalculation')

const ADMINNAME = 'Service Regulation and Information Management Section'

// Function to calculate all indicator scores
const getCalculatedValues = (formData) => {

    const indicators = {
        Service_Coverage_Score:
            formData.Service_Coverage_Score?.KPI_1 === "No"
                ? 0
                : serviceCoverageScore(formData.Service_Coverage_Score),

        Adequacy_Score:
            adequacyScore(formData.Adequacy_Score),

        Water_Quality_Score:
            waterQualityScore(formData.Water_Quality_Score),

        Reliability_Score:
            reliabilityScore(formData.Reliability_Score),

        NRW_Score:
            formData.NRW_Score?.KPI_1 === "No"
                ? 0
                : nrwScore(formData.NRW_Score),

        OM_Score:
            formData.OM_Score?.KPI_1 === "No"
                ? 0
                : omScore(formData.OM_Score),

        Metering_Ratio_Score:
            meteringRatio(formData.Metering_Ratio_Score),

        Grievance_Score:
            formData.Grievance_Score?.KPI_1 === "No"
                ? 0
                : grievanceAddressal(formData.Grievance_Score),
    };

    indicators.SPI = +(
        (
            0.35 * indicators.Water_Quality_Score +
            0.25 * indicators.Service_Coverage_Score +
            0.20 * indicators.Adequacy_Score +
            0.20 * indicators.Reliability_Score
        ) * 100
    ).toFixed(2);

    indicators.OEI = +(
        (
            0.30 * indicators.NRW_Score +
            0.25 * indicators.Grievance_Score +
            0.25 * indicators.OM_Score +
            0.20 * indicators.Metering_Ratio_Score
        ) * 100
    ).toFixed(2);

    return indicators;
};


const approveFormData = async (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.body

        const formData = await temporaryFormData.findById(id);

        if (!formData) {
            return res.status(404).json({
                message: "Form not found"
            });
        }

        const indicators = getCalculatedValues(formData)

        const wsucPayload = {
            WSUC_Name: formData.WSUC_Name,
            Location: formData.Location,
            Service_Coverage_Prerequisite: formData.Service_Coverage_Score?.KPI_1,
            geometry: formData.geometry,
            Documents: formData.Documents,
            Summary_Index: indicators,
            Master_Sheet: {
                HH_Served: formData.Service_Coverage_Score?.KPI_2,
                Total_HH: formData.Service_Coverage_Score?.KPI_3,
            }
        };

        const wsuc = await WSUC.create(wsucPayload);

        await temporaryFormData.findByIdAndDelete(id);

        const reason = `Your form data have been approved by the ${ADMINNAME}`

        // Sending email to the user in case of rejection
        const info = await sendMessageToUser(reason, userEmail)

        if (info) {
            return res.status(200).json({
                message: "Form approved successfully",
                data: wsuc
            });
        } else {
            return res.status(400).json({
                err: "Something is wrong"
            });
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Approval failed",
            error: error.message
        });
    }
};


//When the data provided by the user is not eough or not acceptable 
const rejectFormData = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason, userEmail } = req.body;

        //Checking for userEmail
        if (!userEmail) {
            return res.status(400).json({ err: "User Email not provided" })
        }

        const form = await temporaryFormData.findById(id);

        if (!form) {
            return res.status(404).json({
                message: "Form not found"
            });
        }

        form.Status = "Rejected";

        form.Review = {
            Reviewed_By: ADMINNAME,
            Reviewed_At: new Date(),
            Rejection_Reason: reason
        };

        // Updating the form data in temporaryFormData
        await form.save();

        // Sending email to the user in case of rejection
        const info = await sendMessageToUser(reason, userEmail)
        if (info) {
            return res.status(200).json({
                message: "Form rejected successfully"
            });
        } else {
            return res.status(400).json({
                err: "Something is wrong"
            });
        }

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