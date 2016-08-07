const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config();
var path = require('path');

mongoose.connect(process.env.MONGODB_URI);

require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'my secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const userController = require('./controllers/userController');
const promoController = require('./controllers/promoController');
const funfactController = require('./controllers/funfactController');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/assets', express.static(path.join(__dirname, '/public')));

// mongoose.Promise = global.Promise;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

userController(app, passport);
promoController(app, passport);
funfactController(app, passport);
