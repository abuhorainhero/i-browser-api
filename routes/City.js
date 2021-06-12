const express = require("express");
const router = express.Router();

const { cityValidator } = require("../ValidatorMiddleware/CityValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  cityCreate,
  cityGetAll,
  cityGetOne,
  cityUpdate,
  cityDelete,
} = require("../Controllers/CityController");

router.post("/create", cityValidator, checkValidator, cityCreate);
router.get("/get-all", cityGetAll);
router.get("/get-one/:id", cityGetOne);
router.patch("/update-one/:id", cityValidator, checkValidator, cityUpdate);
router.delete("/delete-one/:id", cityDelete);

module.exports = router;
