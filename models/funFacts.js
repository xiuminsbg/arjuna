var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var funfactSchema = new Schema({
  funfactTitle: String,
  funfactDetail: String
});

var Funfacts = mongoose.model('Funfacts', funfactSchema);

module.exports = Funfacts;
