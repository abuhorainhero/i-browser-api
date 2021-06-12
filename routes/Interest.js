const express = require("express");
const router = express.Router();

const { interestValidator } = require("../ValidatorMiddleware/InterestValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  interestCreate,
  interestGetAll,
  interestGetOne,
  interestUpdate,
  interestDelete,
} = require("../Controllers/interestController");

router.post("/create", interestValidator, checkValidator, interestCreate);
router.get("/get-all", interestGetAll);
router.get("/get-one/:id", interestGetOne);
router.patch("/update-one/:id", interestValidator, checkValidator, interestUpdate);
router.delete("/delete-one/:id", interestDelete);

module.exports = router;
