const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    pseudo : {type: String, require : true},
    password : {type: String, require : true},
});
module.exports = mongoose.model('Form', formSchema);