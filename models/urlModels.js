const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    orignalURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timeStamp: Number }]
}, { timestamps: true })

const Url = mongoose.model("url", urlSchema);

module.exports = Url;