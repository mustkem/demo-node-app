var model  = require('../../models/index.model');
var config = require('../../config/index');
var db 	   = config.connection;
var bcrypt = require("bcrypt-nodejs");
var async = require("async");
var Admin = model.admin;
module.exports = {
	index: async function(req,res){
			var detail = {};
		if(req.method == "GET"){		
			var result = await config.helpers.admin.check_session(req);			
			var detail = {message:req.flash('msg')};			
			res.render('admin/login.ejs',{layout:'admin/layout/layout_login',detail:detail} );
		}else{
			console.log(req.body);
			console.log(db);
			var user = req.body.user;
			var password = req.body.password;
			var user_data = await Admin.findOne({ user : user });
			console.log(user_data);		
			console.log("==========test data=============");	
			Admin.findOne({user:user},function(err,data){
				console.log("========data============");
				console.log(data);
				console.log("========data============");
				if(err){console.log(err)}
						console.log(data)
				if(data){
					if(bcrypt.compareSync(password, data.password)){
						req.session.ECOMEXPRESSADMINID = data._id;
						
						if(req.input('remember_me') == '1'){
							res.cookie('username_co',req.input("user"),{maxAge : new Date(Date.now() + 12096000)});
							res.cookie('pass_c',req.input("password"),{maxAge : new Date(Date.now() + 12096000)});							
						 }else{
						 	res.clearCookie('username_co');
						 	res.clearCookie('pass_c');
						 }
						detail.status = true;
						res.redirect('/admin/dashboard');
					}else{
						req.flash('msg', {msg:'Please Enter valid password',status:false});						
						res.redirect('/admin',);
					}
				}else{
					req.flash('msg', {msg:'Please Enter valid user',status:false});
					res.redirect('/admin');
				}				
			})			
		}	
	},
	create:function(req,res){
		
		var Admin = new admin({
			user:"masteradmin",
			password:bcrypt.hashSync("12345678"),
		})
		Admin.save(function (err) {
			
	        if (err) {
	            console.log(err)
	        }
	        res.send('Admin created successfully')
   	 	})
	},
	logout :function(req,res){
		
		req.session.ECOMEXPRESSADMINID = '';
		var adminsession = req.session.ECOMEXPRESSADMINID?req.session.ECOMEXPRESSADMINID:'';
		if(!adminsession){
			res.redirect('/admin');
		}
	},

	check_email:function(req,res){
		nodeMailer = require('nodemailer'),
		model.admin.findOne({email:req.input('email')}).exec(function(err,user){
		if(err){console.log(err)}
			if(user){
				var password = parseInt(Math.random()*100000000);
				let mailOptions = {
		          from: config.constant.mailconfig.from, // sender address
		          to: user.email, // list of receivers
		          subject: "Forgot password", // Subject line
		          text: req.body.body, // plain text body
		          html: 'Hi '+user.fname+' '+(user.lname?user.lname:'')+'<br/><br/>Username: '+user.user+ '<br/><br/>Password: '+password
		      };
		      
		       config.helpers.transportemail(mailOptions,function(maildata){
		       	model.admin.updateOne({_id:user._id},{password:bcrypt.hashSync(password)}).exec(function(err,data_upd){
		       		res.json({"status": true,"message":req.__("password has been sent to Your Email id")})
		       	})
		       })
			}
			else{					
				res.json({"status": false,"message":req.__("This email not exist. Please choose another.")});
			}
		})
	},
	//get_id:function()
	
}
