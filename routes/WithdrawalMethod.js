const express = require("express");
const router = express.Router();

const { withdrawalMethodValidator } = require("../ValidatorMiddleware/WithdrawalMethodValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  withdrawalMethodCreate,
  withdrawalMethodGetAll,
  withdrawalMethodGetOne,
  withdrawalMethodUpdate,
  withdrawalMethodDelete,
} = require("../Controllers/WithdrawalMethodController");

router.post("/create", withdrawalMethodValidator, checkValidator, withdrawalMethodCreate);
router.get("/get-all", withdrawalMethodGetAll);
router.get("/get-one/:id", withdrawalMethodGetOne);
router.patch("/update-one/:id", withdrawalMethodValidator, checkValidator, withdrawalMethodUpdate);
router.delete("/delete-one/:id", withdrawalMethodDelete);

module.exports = router;
