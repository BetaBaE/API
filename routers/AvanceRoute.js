const express = require("express");
const {
  createAvances,
  getAllAvances,
  getAvanceById,
  getAvanceCount,
  updateAvances,
  avancesByFournisseur,
  avancesByBonCommande,
} = require("../controllers/avance");

const router = express.Router();
router.post("/Avance", createAvances);
router.get("/Avance", getAvanceCount, getAllAvances);
router.get("/Avance/:id", getAvanceById);
router.put("/Avance/:id", updateAvances);
router.get("/Avancebyfournisseur/:idfournisseur", avancesByFournisseur);
router.get("/Avancebyboncommande/:bonCommande", avancesByBonCommande);

module.exports = router;
