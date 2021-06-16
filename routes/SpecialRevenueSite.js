const express = require("express");
const router = express.Router();

const { specialRevenueSiteValidator } = require("../ValidatorMiddleware/SpecialRevenueSite.Validator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  specialRevenueSiteCreate,
  specialRevenueSiteGetAll,
  specialRevenueSiteGetOne,
  specialRevenueSiteUpdate,
  specialRevenueSiteDelete,
} = require("../Controllers/SpecialRevenueSite.Controller");

router.post("/create", specialRevenueSiteValidator, checkValidator, specialRevenueSiteCreate);
router.get("/get-all", specialRevenueSiteGetAll);
router.get("/get-one/:id", specialRevenueSiteGetOne);
router.patch("/update-one/:id", specialRevenueSiteValidator, checkValidator, specialRevenueSiteUpdate);
router.delete("/delete-one/:id", specialRevenueSiteDelete);

module.exports = router;
