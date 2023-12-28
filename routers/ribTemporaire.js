const express = require("express");
const {
  getRibCount,
  getRibs,
  createRibs,
} = require("../controllers/ribTemporaire");

const router = express.Router();

router.get("/ribtempo", getRibCount, getRibs);
router.post("/ribtempo", createRibs);

module.exports = router;
