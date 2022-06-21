

const { findUrlShortener, createNewUrlShortener, findUrl } = require("./crud");

const dns = require("dns");



const verfiyUrl = (req, res, next) => {
    const test = /^(https|http):\/\/(.+)/.test(req.body.url);
    const newUrl = req.body.url.replace(/(https:\/\/|http:\/\/|)/, '').replace(/^(?=www\.)(.+)/, '$1').replace(/^([^\/]+)(\/.*)/, '$1');
    console.log(newUrl);
    if (test) {
        console.log(newUrl);
        dns.lookup(newUrl, (err, addresses, family) => {
            if (err)
                res.json({ error: 'invalid url' });
            if (addresses)
                next();
        });
    } else
        res.json({ error: 'invalid url' });
};



const findOneMiddleware = (req, res, next) => {

    findUrlShortener(req.body.url, (err, data) => {
        if (err) {
            next();
            return;
        }
        if (data)
            res.json({ original_url: data.url, short_url: data.urlShortener })
        if (data == null)
            next();
    })
};


const findByUrlMiddelware = (req, res, next) => {

    findUrl(req.params.urlShortener, (err, data) => {
        if (err) {
            next();
            return;
        }
        if (data) {
            req.url = data.url;
            next();
        }
        if (data == null)
            res.json({ error: 'invalid url' });
    });
}

const createOneMiddleware = (req, res, next) => {

    createNewUrlShortener(req.body.url, (err, data) => {
        if (err) {
            next();
            return;
        }
        if (data)
            res.json({ original_url: data.url, short_url: data.urlShortener })

    })
};




exports.findOneMiddleware = findOneMiddleware;
exports.createOneMiddleware = createOneMiddleware;
exports.verfiyUrl = verfiyUrl;
exports.findByUrlMiddelware = findByUrlMiddelware;