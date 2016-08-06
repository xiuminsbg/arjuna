const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
var path = require('path');

const promoController = require('./controllers/promoController');
const funfactController = require('./controllers/funfactController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect(process.env.MONGODB_URI);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/assets', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

// mongoose.Promise = global.Promise;

app.listen(3000, () => {
  console.log(`listening on port ${port}`);
});

promoController(app);
funfactController(app);
