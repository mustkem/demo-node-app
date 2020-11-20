const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoleSchema = new Schema({
    role_title: {type: String, required: true},
    role_desc:{type: String},
    type:{type: String},
    permission:{type: Array},
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
module.exports = mongoose.model('Role', RoleSchema);