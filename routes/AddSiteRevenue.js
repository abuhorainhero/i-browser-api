const express = require("express");
const router = express.Router();

const { addSiteRevenueValidator } = require("../ValidatorMiddleware/AddSiteRevenue.Validator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  addSiteRevenueCreate,
  addSiteRevenueGetAll,
  addSiteRevenueGetOne,
  addSiteRevenueUpdate,
  addSiteRevenueDelete,
} = require("../Controllers/AddSiteRevenue.Controller");

router.post("/create", addSiteRevenueValidator, checkValidator, addSiteRevenueCreate);
router.get("/get-all", addSiteRevenueGetAll);
router.get("/get-one/:id", addSiteRevenueGetOne);
// --------- don't use for this add-site-revenue --- use update & delete. ------
// router.patch("/update-one/:id", addSiteRevenueValidator, checkValidator, addSiteRevenueUpdate);
// router.delete("/delete-one/:id", addSiteRevenueDelete);

module.exports = router;
