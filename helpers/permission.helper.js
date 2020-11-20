var model  = require('../models/index.model');
var config = require('../config/index');
var mongoose = require('mongoose');
var async = require("async");

module.exports = function(page,req,cb) {
  
		
		var pname = page?page:'';
		var admin_id = req.session.ECOMEXPRESSADMINID;
		
		async.waterfall([
				function(callback){
					model.menu.aggregate([
							{
								$unwind:"$submenu"
							},
							{
								$match:{
									"submenu.slug":pname
								}
							}
						]).exec(function(err,mdata){
							if(err){console.log(err)}
							if(mdata && mdata.length>0){
								 subid =mdata[0].submenu?mdata[0].submenu.id:''
								callback(null,subid)
							}else{
								var re = {id:'', add:0, edit:0,delete:0};
								return re;
							}
					})
				},
				function(subid,callback){
						model.admin.aggregate([
							{
								$match:{
									_id:mongoose.mongo.ObjectId(admin_id)
								}
							},
							{
								$lookup:{
									from:"roles",
									localField:"role",
									foreignField:"_id",
									as:"role"
								}
							},
							{$unwind:"$role"},
							{$unwind:"$role.permission"},
							{ $replaceRoot: { newRoot: "$role.permission" } },
							{$match:{id:subid.toString()}}
							]).exec(function(err,data_admin){
							 if(err){console.log(err)}
								if(data_admin && data_admin.length>0){
									callback(null,data_admin[0])
								}else{
									callback(null,{id:'', add:0, edit:0,delete:0})
								}
								
							
						})
				}
			],function(err,result){					
				cb(err, result);
		})
}


