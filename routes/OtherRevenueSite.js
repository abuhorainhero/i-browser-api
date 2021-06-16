const express = require("express");
const router = express.Router();

const { otherRevenueSiteValidator } = require("../ValidatorMiddleware/OtherRevenueSite.Validator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  otherRevenueSiteCreate,
  otherRevenueSiteGetAll,
  otherRevenueSiteGetOne,
  otherRevenueSiteUpdate,
  otherRevenueSiteDelete,
} = require("../Controllers/OtherRevenueSite.Controller");

router.post("/create", otherRevenueSiteValidator, checkValidator, otherRevenueSiteCreate);
router.get("/get-all", otherRevenueSiteGetAll);
router.get("/get-one/:id", otherRevenueSiteGetOne);
router.patch("/update-one/:id", otherRevenueSiteValidator, checkValidator, otherRevenueSiteUpdate);
router.delete("/delete-one/:id", otherRevenueSiteDelete);

module.exports = router;
