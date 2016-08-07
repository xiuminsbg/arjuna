module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  // Logout
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // signing up
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // logging in
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));
};

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    // if they aren't redirect them to the home page
    res.redirect('/');
  }
}
