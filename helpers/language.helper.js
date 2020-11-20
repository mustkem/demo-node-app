var model  = require('../models/index.model');
var config = require('../config/index');
var mongoose = require('mongoose');
var async = require("async");

module.exports = function(req,callback) {
	model.language.find({deleted_at:0}).sort({default:-1}).exec(function(err,langdata){
		if(langdata && langdata.length>0){
			callback(null,langdata)
		}else{
			callback(null,[]);
		}
	})
}
