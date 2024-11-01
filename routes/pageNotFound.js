const express = require("express");
const router = express.Router();
const {page} = require("../controllers/pageNotFoundController.js");

router.get("/" , page);

module.exports = router;