const express = require("express");
const router = express.Router();

const { adsValidator } = require("../ValidatorMiddleware/AdsValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  adsCreate,
  adsGetAll,
  adsGetOne,
  adsUpdate,
  adsDelete,
} = require("../Controllers/AdsController");

router.post("/create", adsValidator, checkValidator, adsCreate);
router.get("/get-all", adsGetAll);
router.get("/get-one/:id", adsGetOne);
router.patch("/update-one/:id", adsValidator, checkValidator, adsUpdate);
router.delete("/delete-one/:id", adsDelete);

module.exports = router;
