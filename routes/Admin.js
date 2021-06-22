const express = require("express");
const router = express.Router();

const { adminValidator } = require("../ValidatorMiddleware/AdminValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  adminCreate,
  adminGetAll,
  adminGetOne,
  adminUpdate,
  adminDelete,
  loginController
} = require("../Controllers/AdminController");

router.post("/create", adminValidator, checkValidator, adminCreate);
router.get("/get-all", adminGetAll);
router.get("/get-one/:id", adminGetOne);
router.patch("/update-one/:id", adminValidator, checkValidator, adminUpdate);
router.delete("/delete-one/:id", adminDelete);

router.post("/admin-login", loginController);

module.exports = router;
