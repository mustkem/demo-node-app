const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ClassSchema = new Schema({
	name: {type: String, required: true},
	 createdby:{type:String},
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

module.exports = mongoose.model('Class', ClassSchema);
