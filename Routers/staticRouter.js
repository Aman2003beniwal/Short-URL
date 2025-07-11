const express = require("express");
const Url = require("../models/urlModels");
const { route } = require("./userData");
const { restrictTo } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/admin/url", restrictTo(["Admin"]), async (req, res) => {
    const allData = await Url.find({});
    return res.render("Home", { urls: allData });

})

router.get("/userData", restrictTo(["Normal user"]), async (req, res) => {
    // if (!req.user) return res.redirect("/login") 

    const allData = await Url.find({ createdBy: req.user._id });
    return res.render("Home", { urls: allData });
})

router.get("/signup", async (req, res) => {
    return res.render("signup")
})
router.get("/login", async (req, res) => {
    return res.render("login")
})





module.exports = router;