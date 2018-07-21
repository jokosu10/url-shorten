const mongoose = require('mongoose');
const validUrl = require('valid-url');
const UrlShorten = mongoose.model('UrlShorten');
const shortId = require("shortid");
const errorUrl = 'http://localhost/error';

// create route for app
module.exports = app => {
    // GET API for redirecting to Original URL
    app.get("/api/item/:code", async (req, res) => {
        const urlCode = req.params.code;
        const item = await UrlShorten.findOne({ urlCode: urlCode });

        if (item) {
            return res.redirect(item.originalUrl);
        } else {
            return res.redirect(errorUrl);
        }
    });

    // POST API for creating short url from Original URL
    app.post("/api/item", async (req, res) => {
        //const locationDetails = find
        const { shortBaseUrl, originalUrl } = req.body;
        if (validUrl.isUri(shortBaseUrl)) {

        } else {
            return res.status(404).json("invalid Base Url");
        }

        const urlCode = shortId.generate();
        const updateAt = new Date();
        if (validUrl.isUri(originalUrl)) {
            try {
                const item = await UrlShorten.findOne({ originalUrl: originalUrl });
                if (item) {
                    res.status(200).json(item);
                } else {
                    let shortUrl = shortBaseUrl + "/" + urlCode;
                    const item = new UrlShorten({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        updateAt
                    });
                    await item.save();
                    res.status(200).json(item);
                }
            } catch (err) {
                res.status(401).json("Invalid User Id");
            }
        } else {
            return res.status(401).json("Invalid Original Url");
        }
    });
};