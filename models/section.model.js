const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SectionSchema = new Schema({
	name 		: { type : String, required: true},
	status		: { type : Boolean },
	class_id 	: { type : Object },
    deleted_at	: { type : Number},
    createdAt	: {
		type : Date,
        default : Date.now
    },
    updatedAt 	: {
        type : Date,
        default : Date.now
    }  
})

module.exports = mongoose.model('Section', SectionSchema);
