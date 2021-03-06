const express = require("express");
const router = express.Router();

const { newsValidator } = require("../ValidatorMiddleware/NewsValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  newsCreate,
  newsGetAll,
  newsGetLimit,
  newsGetOne,
  newsUpdate,
  newsDelete,
} = require("../Controllers/NewsController");
const { upload } = require("../FileController/NewsFileController")

router.post("/create", upload.single("image"), newsValidator, checkValidator, newsCreate);
router.get("/get-all", newsGetAll);
router.get("/get-limit/:start", newsGetLimit);
router.get("/get-one/:id", newsGetOne);
router.patch("/update-one/:id", upload.single("image"), newsValidator, checkValidator, newsUpdate);
router.delete("/delete-one/:id", newsDelete);

module.exports = router;
