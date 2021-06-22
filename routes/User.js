const express = require("express");
const router = express.Router();

const { userValidator } = require("../ValidatorMiddleware/UserValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  userCreate,
  userGetAll,
  userGetOne,
  userUpdate,
  userDelete,
  loginController
} = require("../Controllers/UserController");

router.post("/create", userValidator, checkValidator, userCreate);
router.get("/get-all", userGetAll);
router.get("/get-one/:id", userGetOne);
router.patch("/update-one/:id", userValidator, checkValidator, userUpdate);
router.delete("/delete-one/:id", userDelete);

router.post("/user-login", loginController);

module.exports = router;
