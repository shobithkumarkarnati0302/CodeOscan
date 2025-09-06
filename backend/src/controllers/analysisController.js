const { z } = require("zod");
const { Analysis } = require("../models/Analysis");
const { validateCodeLanguage, analyzeCodeComplexity } = require("../services/aiService");

const createSchema = z.object({
  title: z.string().max(100).optional().or(z.literal("")),
  language: z.string().min(1),
  code: z.string().min(10).max(5000),
  explanationLevel: z.string().optional(),
});

async function createAnalysis(req, res) {
  try {
    console.log('createAnalysis called for user:', req.user?.id);
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });
    
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log('Validation failed:', parsed.error.flatten());
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { title, language, code, explanationLevel } = parsed.data;
    console.log('Analysis request:', { title, language, codeLength: code.length, explanationLevel });

    const langRes = await validateCodeLanguage({ expectedLanguage: language, code });
    if (!langRes.isValid) {
      console.log('Language validation failed:', langRes.reasoning);
      return res.status(400).json({ error: `Language mismatch: ${langRes.reasoning || ""}`.trim() });
    }

    console.log('Calling analyzeCodeComplexity...');
    const aiOutput = await analyzeCodeComplexity({
      title: title || `Analysis for ${language}`,
      language,
      code,
      explanationLevel,
    });
    console.log('AI analysis completed:', { timeComplexity: aiOutput.timeComplexity, spaceComplexity: aiOutput.spaceComplexity });

    const doc = await Analysis.create({
      userId: req.user.id,
      title: title || `Analysis for ${language}`,
      language,
      codeSnippet: code,
      timeComplexity: aiOutput.timeComplexity,
      spaceComplexity: aiOutput.spaceComplexity,
      explanation: aiOutput.explanation,
      improvementSuggestions: aiOutput.improvementSuggestions,
      isFavorite: false,
      userNotes: "",
    });
    console.log('Analysis saved to DB with ID:', doc._id);

    return res.status(201).json(aiOutput);
  } catch (err) {
    console.error("createAnalysis error", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}

async function listAnalyses(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });
    const { language } = req.query;

    const query = { userId: req.user.id };
    if (language && language !== "all") query.language = language;

    const items = await Analysis.find(query).sort({ createdAt: -1 }).limit(50).lean();
    return res.json(items);
  } catch (err) {
    console.error("listAnalyses error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const updateSchema = z.object({
  title: z.string().max(100).optional(),
  language: z.string().min(1).optional(),
  code: z.string().min(10).max(5000).optional(),
});

async function updateAnalysis(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const update = {};
    if (parsed.data.title !== undefined) update.title = parsed.data.title;
    if (parsed.data.language !== undefined) update.language = parsed.data.language;
    if (parsed.data.code !== undefined) update.codeSnippet = parsed.data.code;

    const doc = await Analysis.findOneAndUpdate({ _id: id, userId: req.user.id }, update, { new: true }).lean();
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err) {
    console.error("updateAnalysis error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteAnalysis(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const result = await Analysis.deleteOne({ _id: id, userId: req.user.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("deleteAnalysis error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function toggleFavorite(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const doc = await Analysis.findOne({ _id: id, userId: req.user.id });
    if (!doc) return res.status(404).json({ error: "Not found" });
    doc.isFavorite = !doc.isFavorite;
    await doc.save();
    return res.json({ isFavorite: doc.isFavorite });
  } catch (err) {
    console.error("toggleFavorite error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const notesSchema = z.object({ notes: z.string().max(5000) });
async function updateNotes(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const parsed = notesSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const doc = await Analysis.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { userNotes: parsed.data.notes },
      { new: true }
    ).lean();

    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("updateNotes error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getByIdPublic(req, res) {
  try {
    const { id } = req.params;
    const doc = await Analysis.findById(id).lean();
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err) {
    console.error("getByIdPublic error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createAnalysis,
  listAnalyses,
  updateAnalysis,
  deleteAnalysis,
  toggleFavorite,
  updateNotes,
  getByIdPublic,
};
