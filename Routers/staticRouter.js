const express = require("express");
const Url = require("../models/urlModels");
const { route } = require("./userData");
const router = express.Router();

router.get("/", async (req, res) => {
    const allData = await Url.find({});
    return res.render("Home", { urls: allData });
})

router.get("/signup",async(req,res)=>{
    return res.render("signup")
})



module.exports = router;