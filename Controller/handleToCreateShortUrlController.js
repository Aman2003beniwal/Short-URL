
const urlSchema = require("../models/urlModels");
const { nanoid } = require("nanoid");

async function handleToCreateShortUrl(req, res) {
    const shortId = nanoid(8);

    const body = req.body;
    if (!body.url) {
        return (res.status(400).json({
            error: "Url must be required"
        }))
    }

    await urlSchema.create({
        shortId: shortId,
        orignalURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    // we are using ejs so we need to use server side rendering

    return res.render("Home", { id: shortId });

    // return res.status(200).json({
    //     message: "Short-Url is created successfully...",
    //     id: shortId,
    //     success: true
    // })

}

async function handleAndRedirectUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await urlSchema.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timeStamp: Date.now() } } })

    return res.redirect(entry.orignalURL);
}

async function getAnalytics(req, res) {
    const shortID = req.params.shortId;
    const result = await urlSchema.findOne({ shortId: shortID });

    res.status(200).json({
        message: "All analytics records",
        totalClick: result.visitHistory.length,
        analystics: result.visitHistory
    })

}

module.exports = { handleToCreateShortUrl, handleAndRedirectUrl, getAnalytics } 