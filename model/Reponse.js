const mongoose = require('mongoose');

const reponseSchema = mongoose.Schema({
    userid: {type: Number, required : true},
    email: {type: String, required : true},
    password: {type: String, required : true},
    admin: {type: Boolean},

    titreQuestionnaire : { type: String, required : false},
    auteur: { type: String, required : false},
    question : { type: String, required : true},
    reponse1 : {type: Boolean},
    reponse2 : {type: Boolean},
    reponse3 : {type: Boolean},
    reponse4 : {type: Boolean},
});


module.exports = mongoose.model('Reponse', reponseSchema);