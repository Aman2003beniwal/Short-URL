const mongoose = require("mongoose");

async function connectionDB(url) {
    mongoose.connect(url);
}

module.exports = connectionDB;