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
  loginController,
  
  forgetPassword,
  resetPassword
} = require("../Controllers/UserController");

router.post("/create", userValidator, checkValidator, userCreate);
router.get("/get-all", userGetAll);
router.get("/get-one/:id", userGetOne);
router.patch("/update-one/:id", userUpdate);
router.delete("/delete-one/:id", userDelete);

router.post("/user-login", loginController);

router.post("/forget-password", forgetPassword);
router.patch("/reset-password", resetPassword);

module.exports = router;
