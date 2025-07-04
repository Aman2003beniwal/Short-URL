const express = require("express");
const { signup, login, fetchAllData } = require("../Controller/userData");

const router = express.Router();

router.get("/allData", fetchAllData)
router.post("/signup", signup)
router.post("/login", login);

module.exports = router;