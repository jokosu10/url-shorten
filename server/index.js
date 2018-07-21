// all module when we need
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost/url-shortner";
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true,
};

require('./models/UrlShorten');
const app = express();

app.use(bodyParser.json());
// connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.set("debug", true);
mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, err);
    console.log(`Connected to mongoDB`);
})

require('./routes/urlshorten')(app);
const PORT = 7000;

// start server on Port 7000
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
})