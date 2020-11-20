var model  = require('../models/index.model');

module.exports = {
	 email: {
	 	custom:{
	 		options:function(value){
	 			return new Promise((resolve,reject)=>{
	 				model.user.findOne({email:value}).exec(function(err,data_email){
	 				if(data_email){
	 					reject()
	 				}else{
	 					resolve()
	 				}
	 			})
	 			})
	 		},
	 		errorMessage: 'ID is wrong',
	 	}
	 },
	pass_confirmation: {
		    isLength: {
		      errorMessage: 'Password should be at least 7 chars long',
		      // Multiple options would be expressed as an array
		      options: { min: 10 }
		    }
		}
}