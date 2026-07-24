const mongoose = require('mongoose')

const researchPaperSchema = new mongoose.Schema({
    Publisher: { type: String, required: true },
    Document: {
        name: { type: String, required: true },
        path: { type: String, required: true }
    },

}, { timestamps: true })


module.exports = mongoose.model('researchPaper', researchPaperSchema)