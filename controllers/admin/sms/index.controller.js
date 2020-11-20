var model  = require('../../../models/index.model');
var config = require('../../../config/index');
var async = require("async");
const request = require('request');
var ObjectId = require('mongodb').ObjectId;
var self= module.exports  = {
	
	add : async function(req,res){
		if(req.method == "GET"){
			var classes = await model.class.find({ deleted_at : 0 });
			var section = await model.section.find({ deleted_at : 0 });
			config.helpers.permission('user', req, (err,permission)=>{
				res.render('admin/sms/add.ejs', { layout : 'admin/layout/layout', classes : classes, permission : permission, section : section} );
			});
		}else{
			console.log(req.body);
			var url = "https://www.sms4india.com/api/v1/sendCampaign";
			var api_key = "BBH189UW0OE8S8UX00Q6HK52LF1WVHDN";
			var secret = "IZ0N6QXLLO3PSMG0";
			//var data = await model.user.find({ class_id : new ObjectId(req.body.class_id), section_id : new ObjectId(req.body.section_id), deleted_at : 0, status : true });
			var data = await model.user.find({ deleted_at : 0, status : true });
			console.log(data.length);
			async.forEach(data, function(value, callback){
				request.post(url, {
					json : {"apikey": api_key,"secret":secret,"usetype": "stage","senderid":"TESTID","phone":value.mobile,"message":req.body.sms},
					headers: {
						'Content-Type' : 'application/json'
					}
				},function(error, response, body) {
					console.log(error);
					console.log(response.body);
					callback()
				});
			}, function(eror){
				req.flash('message', req.__('Sms send successfully'));
				res.redirect('/admin/sms/add')
			});
		}
	}
	
}
