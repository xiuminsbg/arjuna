var Promos = require('../models/promo');

module.exports = function (app) {
  // GET All promos
  app.get('/promos', function (req, res) {
    Promos.find({}, function (err, promos) {
      if (err) throw err;
      res.send(promos);
      console.log('Get ALL promos successful');
    });
  });
  // GET a promo
  app.get('/promo/:id', function (req, res) {
    Promos.findById({_id: req.params.id}, function (err, promos) {
      if (err) throw err;
      res.send(promos);
    });
  });

  // ADD
  app.post('/promo/add', function (req, res) {
    var newPromo = Promos({
      promoTitle: req.body.promoTitle,
      promoAmount: req.body.promoAmount,
      promoDate: req.body.promoDate,
      promoDetail: req.body.promoDetail
    });
    newPromo.save(function (err, promo) {
      if (err) throw err;
      res.send('Add new Promo successful');
    });
  });

  // EDIT
  app.put('/promo/edit/:id', function (req, res) {
    Promos.findByIdAndUpdate(req.params.id, {promoTitle: req.body.promoTitle, promoAmount: req.body.promoAmount, promoDate: req.body.promoDate, promoDetail: req.body.promoDetail}, function (err, promo) {
      if (err) throw err;
      res.send('Promo edited successfully');
    });
  });

  // Delete
  app.delete('/promo/delete/:id', function (req, res) {
    console.log('Promo: ' + req.params.id + 'deleted');
    Promos.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      res.send('Promo successfully deleted');
    });
  });
};
