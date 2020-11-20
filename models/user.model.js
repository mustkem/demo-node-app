const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, required: true},
	father_name: { type: String },
	email:{type:String},
	mobile:{type:Number},
	class_id : { type : Object },
	section_id : { type : Object },
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
})

module.exports = mongoose.model('User', UserSchema);
