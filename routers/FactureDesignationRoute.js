const express = require("express");
const {
  getdesignations,
  getdesignationbyid,
} = require("../controllers/designationFacture");

const router = express.Router();
router.get("/designation", getdesignations);
router.get("/designation/:id", getdesignationbyid);

module.exports = router;
