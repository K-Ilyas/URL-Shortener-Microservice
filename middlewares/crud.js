
const urlModel = require("../models/urlModel");


const createNewUrlShortener = (url, done) => {
    urlModel.find({}).select({ urlShortener: 1 }).sort({ urlShortener: "desc" }).limit(1).exec((err, data) => {
        if (err)
            return console.log(err);
        else {
            const newUrlShortener = new urlModel({ url: url, urlShortener: data[0].urlShortener + 1 });
            newUrlShortener.save((err, data) => {
                if (err)
                    return console.log(err);
                done(null, data);
            });
        }
    });


}

const findUrlShortener = (url, done) => {
    urlModel.findOne({ url: url }, (err, data) => {
        if (err)
            return console.log(err);
        done(null, data);
    });
};

const findUrl = (urlShortener, done) => {
    urlModel.findOne({ urlShortener: parseInt(urlShortener) }, (err, data) => {
        if (err)
            return console.log(err);
        done(null, data);
    });
}

exports.createNewUrlShortener = createNewUrlShortener;
exports.findUrlShortener = findUrlShortener;
exports.findUrl = findUrl;