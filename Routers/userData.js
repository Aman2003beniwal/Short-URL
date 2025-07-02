const express = require("express");
const { signup } = require("../Controller/userData");

const router = express.Router();

router.post("/", signup)

module.exports = router;