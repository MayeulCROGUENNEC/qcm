const mongoose = require('mongoose');


const qcmSchema = mongoose.Schema({
    titreQuestionnaire : { type: String, required : false},
    auteur: { type: String, required : false},
    questions : [ {
        description : { type: String, required : false},
        reponse1 : { type: String, required : false},
        reponse2 : { type: String, required : false},
        reponse3 : { type: String, required : false},
        reponse4 : { type: String, required : false},
    }]
    
});

module.exports = mongoose.model('Qcm', qcmSchema)