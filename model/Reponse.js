const mongoose = require('mongoose');

const reponseSchema = mongoose.Schema({
    
    idQuestionnaire : { type: String, required : false},
    titreQuestionnaire : { type: String, required : false },
    auteur: { type: String, required : false},
    utilisateur : { type: String, required : false},
    questions : [ {
        description : { type: String, required : false},
        reponse1 : new mongoose.Schema({text: String, isChecked: Boolean}),
        reponse2 : new mongoose.Schema({text: String, isChecked: Boolean}),
        reponse3 : new mongoose.Schema({text: String, isChecked: Boolean}),
        reponse4 : new mongoose.Schema({text: String, isChecked: Boolean}),
    }],
    commentaire : { type: String, required : false}

});


module.exports = mongoose.model('Reponse', reponseSchema);