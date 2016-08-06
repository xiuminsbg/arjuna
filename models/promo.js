var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var promoSchema = new Schema({
  promoTitle: String,
  promoAmount: String,
  promoDate: String,
  promoDetail: String
});

var Promos = mongoose.model('Promos', promoSchema);

module.exports = Promos;
