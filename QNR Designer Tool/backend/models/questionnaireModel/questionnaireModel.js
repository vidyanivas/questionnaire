import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
    questionnaireName: {type: String, required: true},
    clientName: {type: String, required: true},
    projectNumber: {type: String, required: true},
    projectLead: {type: String, required: true},
    lastAccessed: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
})
const Questionnaire = mongoose.model("QuestionnaireDetails", questionnaireSchema)
module.exports = Questionnaire