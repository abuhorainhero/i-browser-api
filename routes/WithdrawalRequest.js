const express = require("express");
const router = express.Router();

const { withdrawalRequestValidator } = require("../ValidatorMiddleware/WithdrawalRequestValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  withdrawalRequestCreate,
  withdrawalRequestGetAll,
  withdrawalRequestGetOne,
  withdrawalRequestUpdate,
  withdrawalRequestDelete,
} = require("../Controllers/WithdrawalRequestController");

router.post("/create", withdrawalRequestValidator, checkValidator, withdrawalRequestCreate);
router.get("/get-all", withdrawalRequestGetAll);
router.get("/get-one/:id", withdrawalRequestGetOne);
router.patch("/update-one/:id", withdrawalRequestUpdate);
// router.delete("/delete-one/:id", withdrawalRequestDelete);

module.exports = router;
