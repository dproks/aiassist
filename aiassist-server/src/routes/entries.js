const express = require("express");
const { handleGetEntries, handleAddEntry } = require("./handlers");
const router = express.Router();

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router.route("/entries").get(handleGetEntries);

router.route("/entry").post(handleAddEntry);

module.exports = router;
