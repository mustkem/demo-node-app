var model  = require('../../../models/index.model');
var config = require('../../../config/index');
var db 	   = config.connection;
var async = require("async");
var Admin = model.admin;
var mongoose = require('mongoose');
module.exports = {
	index: async function(req,res){		
		res.render('admin/dashboard/index.ejs',{layout:'admin/layout/layout'} );
	},
	allmenu:function(req,res){
		async.waterfall([
				function(callback){
					model.admin.aggregate([
							{
								$match:{
									_id:mongoose.mongo.ObjectId(req.session.ECOMEXPRESSADMINID),
								}
							},
							{
								$lookup:{
									from:"roles",
									localField:"role",
									foreignField:"_id",
									as:'role'
								}
							},
							{
								$unwind:"$role"
							},
							{
								$unwind:"$role.permission"
							},
							{
								$group:{_id:null,roleid:{$push:"$role.permission.id"}}
							}
						]).exec(function(err,data_menu){
							if(data_menu && data_menu.length>0){
								callback(null,data_menu[0].roleid);
							}else{
								callback(null,[]);
							}							
						})
				}
			],function(err,roleid){
				roleid.push('595a398ea9d815d56a9d357e')
			model.menu.find({menu_id:{$in:roleid},status:true},function (err, allmenu) {
				if(err){
					console.log(err)
				}
				res.render('admin/dashboard/menu.ejs',{layout:false, allmenu:allmenu,roleid:roleid} );			
			});
		})
		
	}
	
}
