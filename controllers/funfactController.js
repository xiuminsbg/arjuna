var Funfacts = require('../models/funFacts');

module.exports = function (app, passport) {
  app.get('/funfacts', isLoggedIn, function (req, res) {
    Funfacts.find({}, function (err, funfacts) {
      if (err) throw err;
      res.send(funfacts);
      console.log('Get ALL fun facts successful');
    });
  });
  // GET a funfact
  app.get('/funfact/:id', isLoggedIn, function (req, res) {
    Funfacts.findById({_id: req.params.id}, function (err, funfacts) {
      if (err) throw err;
      res.send(funfacts);
    });
  });

  // ADD
  app.post('/funfact/add', isLoggedIn, function (req, res) {
    var newFunfact = Funfacts({
      funfactTitle: req.body.funfactTitle,
      funfactDetail: req.body.funfactDetail
    });
    newFunfact.save(function (err, funfact) {
      if (err) throw err;
      res.send('Add new Funfact successful');
    });
  });

  // EDIT
  app.put('/funfact/edit/:id', isLoggedIn, function (req, res) {
    Funfacts.findByIdAndUpdate(req.params.id, {funfactTitle: req.body.funfactTitle, funfactDetail: req.body.funfactDetail}, function (err, funfact) {
      if (err) throw err;
      res.send('Funfact edited successfully');
    });
  });

  // Delete
  app.delete('/funfact/delete/:id', isLoggedIn, function (req, res) {
    Funfacts.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      res.send('Funfact successfully deleted');
      console.log('Funfact: ' + req.params.id + ' deleted');
    });
  });
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
