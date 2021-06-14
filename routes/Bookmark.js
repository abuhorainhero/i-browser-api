const express = require("express");
const router = express.Router();

const { bookmarkValidator } = require("../ValidatorMiddleware/BookmarkValidator");
const { checkValidator } = require("../ValidatorMiddleware/ValidatorResult");
const {
  bookmarkCreate,
  bookmarkGetAll,
  bookmarkGetOne,
  bookmarkUpdate,
  bookmarkDelete,
} = require("../Controllers/BookmarkController");

router.post("/create", bookmarkValidator, checkValidator, bookmarkCreate);
router.get("/get-all", bookmarkGetAll);
router.get("/get-one/:id", bookmarkGetOne);
router.patch("/update-one/:id", bookmarkValidator, checkValidator, bookmarkUpdate);
router.delete("/delete-one/:id", bookmarkDelete);

module.exports = router;
