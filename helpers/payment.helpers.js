var model  = require('../models/index.model');
var paypal = require('paypal-rest-sdk');
var config = require('../config/index');
//var config = '';
paypal.configure(config.constant.PAYPALAPI);
module.exports = {
	 index: function(req,cb){
	 	var record =[];
	 	console.log("-------------record Helper--------------",req.input('__all__'));
	 	cb(null,record);

	 },

	 processAgreement : (req,cb)=>{
	 var token = req.query.token;
    paypal.billingAgreement.execute(token, {}, function (error, billingAgreement) {
        if (error) {
            cb(error,null);
        } else {
             cb(null,billingAgreement);
        }
    });
	}
}