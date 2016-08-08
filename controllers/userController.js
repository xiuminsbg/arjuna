
module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.status(201).json({message: 'Signup or login'});
  });

  app.get('/login', function (req, res) {
    res.status(201).json({message: 'Login'});
  });

  app.get('/signup', function (req, res) {
    res.status(201).json({message: 'Signup'});
  });

  // Logout
  app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
      status: 'Logged Out'
    });
  });

  // signing up
  app.get('/signupfailure', function (req, res) {
    res.status(401).json({message: 'Signup Failed.', success: true});
  });

  app.get('/signupsuccess', function (req, res) {
    res.status(200).json({message: 'Welcome! Signup successful!', success: true});
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupsuccess',
    failureRedirect: '/signupfailure',
    failureFlash: true
  }));

  // logging in
  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          err: info
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.status(500).json({
            err: 'Login denied.'
          });
        }
        res.status(200).json({
          status: 'Login successful!'
        });
      });
    })(req, res, next);
  });
};
