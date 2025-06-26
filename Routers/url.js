const express = require("express");
const router = express.Router();
const { handleAndRedirectUrl, handleToCreateShortUrl, getAnalytics } = require("../Controller/handleToCreateShortUrlController");

const { model } = require("mongoose");

router.post("/", handleToCreateShortUrl);

router.get("/:shortId", handleAndRedirectUrl)
router.get("/analytics/:shortId", getAnalytics)

module.exports = router;
