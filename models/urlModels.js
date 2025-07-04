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
    visitHistory: [{ timeStamp: Number }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usersc"
    }
}, { timestamps: true })

const Url = mongoose.model("url", urlSchema);

module.exports = Url;