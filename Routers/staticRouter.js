const express = require("express");
const Url = require("../models/urlModels");
const router = express.Router();

router.get("/", async (req, res) => {
    const allData = await Url.find({});
    return res.render("Home", { urls: allData });
})



module.exports = router;