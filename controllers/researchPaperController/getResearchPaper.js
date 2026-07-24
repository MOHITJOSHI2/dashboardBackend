const researchPaperModel = require("../../models/researchPaperModel/researchPaperModel"); // Adjust path

const getResearchPapers = async (req, res) => {
    try {
        const researchPapers = await researchPaperModel
            .find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: researchPapers
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch research papers."
        });
    }
};

module.exports = {
    getResearchPapers
};