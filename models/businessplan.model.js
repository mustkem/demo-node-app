const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BusinessplanSchema = new Schema({
    name: {type: String, required: true},
    day:{type: Number},
    price:{type: Number},
    no_of_downloads:{type: Number},   
    status:{type: Boolean},
    deleted_at:{type: Number},
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
module.exports = mongoose.model('Businessplan', BusinessplanSchema);