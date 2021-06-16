const express = require("express");
const router = express.Router();

const { viewedAdsValidator } = require("../ValidatorMiddleware/ViewedAdsValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  viewedAdsCreate,
  viewedAdsGetAll,
  viewedAdsGetOne,
  viewedAdsUpdate,
  viewedAdsDelete,
} = require("../Controllers/ViewedAdsController");

router.post("/create", viewedAdsValidator, checkValidator, viewedAdsCreate);
router.get("/get-all", viewedAdsGetAll);
router.get("/get-one/:id", viewedAdsGetOne);
router.patch("/update-one/:id", viewedAdsValidator, checkValidator, viewedAdsUpdate);
router.delete("/delete-one/:id", viewedAdsDelete);

module.exports = router;
