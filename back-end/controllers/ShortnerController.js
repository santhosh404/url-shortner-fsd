import { nanoid } from "nanoid";
import Url from "../models/UrlModel.js";

const shortenUrl = async (req, res) => {
    const { url } = req.body;
    try {

        if (!url) {
            return res.status(400).json({
                status: "Error",
                message: "Shorten Url Failed!",
                data: {
                    error: "No url provided!"
                }
            });
        }

        // Check if the URL already exists for the user
        const existingUrl = await Url.findOne({ url: url, userId: req.user._id });
        if (existingUrl) {
            return res.status(409).json({
                status: "Error",
                message: "Duplicate URL Error!",
                data: {
                    error: "The URL already exists for this user.",
                    existingUrl: existingUrl.shortUrl
                }
            });
        }

        const shortId = nanoid(5);
        const shortenUrl = new Url({ url: url, shortUrl: shortId, userId: req.user._id });
        await shortenUrl.save();
        return res.status(200).json({
            status: "Success",
            message: "Shorten Url Success!",
            data: {
                shortenUrl: shortenUrl
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Shorten Url Failed!",
            data: {
                error: err.message
            }
        });
    }
}


const getUrl = async (req, res) => {
    const { shortId } = req.params;
    try {
        if (!shortId) {
            return res.status(400).json({
                status: "Error",
                message: "Get Url Failed!",
                data: {
                    error: "No url provided!"
                }
            });
        }
        const url = await Url.findOne({ shortUrl: shortId });
        if (!url) {
            return res.status(404).json({
                status: "Error",
                message: "Get Url Failed!",
                data: {
                    error: "Url not found!"
                }
            });
        }
        // Update the click count and fetch the updated document
        const response = await Url.updateOne(
            { shortUrl: shortId },
            { $inc: { clicks: 1 } }
        );
        res.redirect(url.url);
    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Get Url Failed!",
            data: {
                error: err.message
            }
        });
    }
}


const myUrls = async (req, res) => {
    const page = parseInt(req.query.page)
    const rowsPerPage = parseInt(req.query.rowsPerPage)

    try {
        if (!page || !rowsPerPage) {
            return res.status(400).json({
                status: "Error",
                message: "Get Url Failed!",
                data: {
                    error: "No page or rows per page provided!"
                }
            });
        }
        const urls = await Url.find({ userId: req.user._id })
            .sort({ date: -1 })
            .skip((page - 1) * rowsPerPage)
            .limit(rowsPerPage)

        const urlsCount = await Url.find({ userId: req.user._id })
        return res.status(200).json({
            status: "Success",
            message: "Get Url Success!",
            data: {
                urls: urls,
                totalCount: urlsCount.length
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "Error",
            message: "Get Url Failed!",
            data: {
                error: err.message
            }
        });
    }
}


const getUrlDetails = async (req, res) => {

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const todayUrls = await Url.find({
        userId: req.user._id,
        date: { $gte: startOfDay }
    });

    const currentMonthUrls = await Url.find({
        userId: req.user._id,
        date: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const totalUrls = await Url.find({
        userId: req.user._id,
    })
    return res.status(200).json({
        status: "Success",
        message: "Get Url Success!",
        data: {
            totalUrls: totalUrls.length,
            todayUrls: todayUrls.length,
            currentMonthUrls: currentMonthUrls.length
        }
    })
}



export { shortenUrl, getUrl, myUrls, getUrlDetails }