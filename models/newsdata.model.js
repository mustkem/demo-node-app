const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewsdataSchema = new Schema({
    data: {type:Array}, 
});


// Export the model
module.exports = mongoose.model('Newsdata', NewsdataSchema);