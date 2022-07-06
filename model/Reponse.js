const mongoose = require('mongoose');

const reponseSchema = mongoose.Schema({
    
    questionnaire : { type: String, required : false},
    auteur: { type: String, required : false},
    user : { type: String, required : false},
    questions : [ {
        description : { type: String, required : false},
        reponse1 : new mongooseSchema({text: String, isChecked: Boolean}),
        reponse2 : new mongooseSchema({text: String, isChecked: Boolean}),
        reponse3 : new mongooseSchema({text: String, isChecked: Boolean}),
        reponse4 : new mongooseSchema({text: String, isChecked: Boolean}),
    }]

});


module.exports = mongoose.model('Reponse', reponseSchema);