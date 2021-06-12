var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("This is iBrowser application Backend Api site...")
});

module.exports = router;
