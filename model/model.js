const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    lastname : {type: String, require : true},
    firstname : {type: String, require : true},
    email : {type: String, require : true},
    message : {type: String, require : true},
});
module.exports = mongoose.model('Form', formSchema)