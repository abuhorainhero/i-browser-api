const express = require("express");
const router = express.Router();

const { countryValidator } = require("../ValidatorMiddleware/CountryValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  countryCreate,
  countryGetAll,
  countryGetOne,
  countryUpdate,
  countryDelete,
} = require("../Controllers/CountryController");

router.post("/create", countryValidator, checkValidator, countryCreate);
router.get("/get-all", countryGetAll);
router.get("/get-one/:id", countryGetOne);
router.patch("/update-one/:id", countryValidator, checkValidator, countryUpdate);
router.delete("/delete-one/:id", countryDelete);

module.exports = router;
