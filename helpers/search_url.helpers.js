var model  = require('../models/index.model');
var config = require('../config/index');
module.exports = {
	administrator:function(req,cb){
		var query = "?search=1";
		if(req.param('pname')){
			query = query+"&name="+req.param('pname');
		}
		if(req.param('pemail')){
			query = query+"&email="+req.param('pemail');
		}
		if(req.param('user_name')){
			query = query+"&username="+req.param('user_name');
		}
		if(req.param('prole')){
			query = query+"&role="+req.param('prole');
		}
		if(req.param('pstatus')){
			query = query+"&status="+req.param('pstatus');
		}
		
		if(query!="?search=1"){
			cb(query);
		}else{
			cb('');
		}
	}
}