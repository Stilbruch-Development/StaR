const express = require("express"),
  router = express.Router(),
  helperExpander = require("../helpers/expander");

router
  .route("/")
  .get(helperExpander.getExpander)
  .post(helperExpander.setExpanderItem);

module.exports = router;
