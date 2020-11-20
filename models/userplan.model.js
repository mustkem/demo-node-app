const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserplanSchema = new Schema({
    name: {type: String, required: true},
    day:{type: Number},
    price:{type: Number},
    no_of_user_downloads:{type: Number},   
    no_of_bussiness_downloads:{type: Number},   
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
module.exports = mongoose.model('Userplan', UserplanSchema);