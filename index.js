const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// .env confg
dotenv.config();
const cors = require("cors");
const path = require("path");
const connectdb = require("./connection");
const middlewares = require("./middlewares/middleware");

// load PORT from .env
const port = process.env.PORT || 3000;

// config cors 
app.use(cors({ optionsSuccessStatus: 200 }));

//config body parser 
app.use(bodyParser.urlencoded({ extended: false }));

// config static assets
app.use("/public", express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});
app.get("/api/shorturl/:urlShortener", middlewares.findByUrlMiddelware, (req, res) => {
    res.redirect(req.url);
});
app.post("/api/shorturl", middlewares.verfiyUrl, middlewares.findOneMiddleware, middlewares.createOneMiddleware, (req, res) => {
    res.json({ error: 'invalid url' });
});



// config listen function
app.listen(port, () => {
    console.log(`app listening on PORT : ${port}`);
});