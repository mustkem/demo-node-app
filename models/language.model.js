const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LanguageSchema = new Schema({
    name: {type: String},
    lng_code:{type: String},
    lng_name:{type: String},
    lng_flag:{type: String},
    default:{type:Number}, 
    status:{type:Boolean},  
    deleted_at:{type:Number}, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }         
});

// Export the model
module.exports = mongoose.model('Language', LanguageSchema);