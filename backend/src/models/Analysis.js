const mongoose = require("mongoose");

const { Schema } = mongoose;

const AnalysisSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, default: "" },
    language: { type: String, required: true, index: true },
    codeSnippet: { type: String, required: true },
    timeComplexity: { type: String },
    spaceComplexity: { type: String },
    explanation: { type: String },
    improvementSuggestions: { type: String },
    isFavorite: { type: Boolean, default: false },
    userNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

const Analysis = mongoose.models.Analysis || mongoose.model("Analysis", AnalysisSchema);
module.exports = { Analysis };
