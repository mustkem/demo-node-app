const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
let AdminSchema = new Schema({
	superadmin:{type: Boolean},
	fname:{type: String},
	lname:{type: String},
	image:{type: String},
	email:{type: String},
    user: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    role:{type:ObjectId},
    status:{type: Boolean},
    block:{type: Boolean},
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
module.exports = mongoose.model('Admin', AdminSchema);