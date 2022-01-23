let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nom: String,
    professor_name: String,
    professor_img: String
});

MatiereSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le premier paramètre est la "collection" mongoDB
// ATTENTION, y'a du matching entre la chaine passée
// et le vrai nom de la collection (en gros, ça cherche la
// collection mongoDB qui est "la plus proche")
module.exports = mongoose.model('matieres', MatiereSchema);
