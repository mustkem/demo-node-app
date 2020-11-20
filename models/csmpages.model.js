const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CmspagesSchema = new Schema({
    content_heading: {type : String},  
	  short_desc 	: {type : String},
	  status     	: {type : Boolean},
	  deleted_at    : {type : Number},
	  page_image 	: {type : String},
	  page_title 	: {type : String},
	  meta_key 		: {type : String},
	  meta_desc 	: {type : String}
});

// Export the model
module.exports = mongoose.model('Cmspages', CmspagesSchema);