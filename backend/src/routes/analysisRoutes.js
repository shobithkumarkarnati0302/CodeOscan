const { Router } = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  createAnalysis,
  deleteAnalysis,
  getByIdPublic,
  listAnalyses,
  toggleFavorite,
  updateAnalysis,
  updateNotes,
} = require("../controllers/analysisController");

const router = Router();

router.get("/", requireAuth, listAnalyses);
router.post("/", requireAuth, createAnalysis);
router.patch("/:id", requireAuth, updateAnalysis);
router.delete("/:id", requireAuth, deleteAnalysis);
router.patch("/:id/favorite", requireAuth, toggleFavorite);
router.patch("/:id/notes", requireAuth, updateNotes);
router.get("/:id", getByIdPublic); // public share

module.exports = router;
