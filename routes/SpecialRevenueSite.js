const express = require("express");
const router = express.Router();

const { uploadIcon } = require("../FileController/SpecialSiteFileController")
const { specialRevenueSiteValidator } = require("../ValidatorMiddleware/SpecialRevenueSite.Validator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  specialRevenueSiteCreate,
  specialRevenueSiteGetAll,
  specialRevenueSiteGetOne,
  specialRevenueSiteUpdate,
  specialRevenueSiteDelete,
} = require("../Controllers/SpecialRevenueSite.Controller");

router.post("/create", uploadIcon.single("icon"), specialRevenueSiteValidator, checkValidator, specialRevenueSiteCreate);
router.get("/get-all", specialRevenueSiteGetAll);
router.get("/get-one/:id", specialRevenueSiteGetOne);
router.patch("/update-one/:id", uploadIcon.single("icon"), specialRevenueSiteUpdate);
router.delete("/delete-one/:id", specialRevenueSiteDelete);

module.exports = router;
