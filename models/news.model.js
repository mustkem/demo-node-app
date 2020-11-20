const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewsSchema = new Schema({
    newadate:{type: Date},
    title: {type: String, required: true},
    tid:{type: String,unique:true},
    tid:{type: String},
    tid_str:{type: String},
    expanded_url:{type: String},
    screen_name:{type: String},
    webtitle:{type: String},
    webdesc:{type: String},
    webimage:{type: String},
    scrap:{type: Number},  
    entities:{type: Array},
    extended_entities:{type: Array}
});


// Export the model
module.exports = mongoose.model('News', NewsSchema);