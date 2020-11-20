module.exports = {
	isloggedin: function(req,res,next){
		
		if(!req.session.ECOMEXPRESSADMINID){
			res.redirect('/admin');
		}else{
			next();
		}
	},
	isloggedinadmin: function(req,res,next){		
		if(req.session.ECOMEXPRESSADMINID){
			res.redirect('/admin/dashboard');
		}else{
			next();
		}
	},

	

}