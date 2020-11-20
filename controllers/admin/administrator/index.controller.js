var model  = require('../../../models/index.model');
var config = require('../../../config/index');
var db 	   = config.connection;
var async = require("async");
var bcrypt = require("bcrypt-nodejs");
var Admin = model.admin;
var permission = {add:1,edit:1,delete:1}
module.exports = {
	index:function(req,res){
		config.helpers.search_url.administrator(req, function(data_search){
			if(data_search!=""){
	          return res.redirect(config.constant.ADMINSITEURL+"administrator"+data_search);
	        }
			model.role.find({deleted_at:0, type:"subadmin"}).exec(function(err,data_admin){
				res.render('admin/administrator/view.ejs',{layout:'admin/layout/layout', data_role:data_admin,permission:permission,all_role:data_admin} );
			})
		})
	},
	add:function(req,res){

		if(req.method == "GET"){
			model.role.find({deleted_at:0,status:true}).sort({"role_title":"ASC"}).exec(function (err, adminrole) {
				res.render('admin/administrator/add.ejs',{layout:'admin/layout/layout',role :adminrole} );
			})
			
		}else{
			var New_admin = new Admin(new_admin = {
				superadmin :false,
				fname : req.input("name"),
				lname : req.input("lname"),
				image :'',
				email : req.input("email"),
				user : req.input("username"),
				password : bcrypt.hashSync(req.input("password")),
				role : req.input("role_id"),
				deleted_at : 0,
				status : true,								
			});

			New_admin.save(function(err,data){
				if(err) console.error(err);			        	
	        	req.flash('message', req.__('Admin has been added Successfully'));
				return res.redirect('/admin/administrator')
			});
		}		
	},

	all_administrator:function(req,res){
		var search = {deleted_at:0}
		var cat_id = req.body.cat_id;
		var search_val = req.body.search.value;
		if(search_val){			
            search.fname = { $regex: '.*' + search_val + '.*',$options:'i' }
		}
		var seq = req.body.order?req.body.order:[{}]
		//sorting
		var sort_json = {0:"createdAt",1:"role_title"};
		var col = sort_json[seq[0]['column']];
		var dir = seq[0]['dir'];
		if(req.body.order[0]['column']==0){
	      dir = 'DESC';
	    }
	    if(req.input('name')){
	    	search.fname = { $regex: '.*' + req.input('name') + '.*',$options:'i' }
			
   		 }
	    if(req.input('email')){
	    	search.email = { $regex: '.*' + req.input('email') + '.*',$options:'i' }		
   		 }
		if(req.input('username')){
			
			search.user = { $regex: '.*' + req.input('username') + '.*',$options:'i' }
		}
		if(req.input('role')){
			search.role = req.input('role');
		}

	    if(req.input('status')){
	      search.status = req.input('status')==1?true:false;
	    }
		
		var skip =req.input('start')?parseInt(req.input('start')):0;
		var limit=req.input('length')?parseInt(req.input('length')):10;
		console.log(search);
		async.parallel({
		    count:function(callback) {
		        model.admin.countDocuments(search).exec(function(err,data_count){
		        	callback(null,data_count)
		        })
		    },
		    data:function(callback) {		    
		    	model.admin.aggregate([
		    		{$match:search},
		    		{
		    			$lookup:
					     {
					       from: "roles",
					       localField: "role",
					       foreignField: "_id",
					       as: "roledata"
					     }
				 	},
				 	{
				 		$sort : { _id : -1}
				 	},
				 	{
				 		$skip:skip
				 	},
				 	{
				 		$limit:limit
				 	}
		    		
		    		]).exec(function(err,data){
		        	callback(null,data)
		        })		        
		    }
		},		
		function(err, results) {			
		   var obj = {};
			obj.draw = req.body.draw;
			obj.recordsTotal = results.count?results.count:0;
			obj.recordsFiltered =results.count?results.count:0;
			var data = results.data?results.data:[];
			var arr =[];
			var perdata = {add:1,edit:1,delete:1}
			for(i=0;i<data.length;i++){
					var arr1 = [];
					var lname = data[i].lname?data[i].lname:'';
					arr1.push('<input type="checkbox" name="action_check[]" class="all_check" value="'+data[i]._id+'">');
					arr1.push(data[i].fname+' '+lname);
					arr1.push(data[i].email?data[i].email:'');
					arr1.push(data[i].user?data[i].user:'');
					arr1.push((data[i].roledata && data[i].roledata.length)?data[i].roledata[0].role_title:'');
					if(!data[i].status){
						var rid = data[i]._id;
					arr1.push('<p id="status_'+data[i]._id+'"><span  class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+data[i]._id+'\',1,\'administrator\');">Inactive</i></span></p>');
					}else{
						arr1.push('<p id="status_'+data[i]._id+'"><span  class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+data[i]._id+'\',0,\'administrator\');">Active</i></span></p>');
					}
					/*if(!data[i].block){
					var rid = data[i]._id;
				   arr1.push('<p id="block_'+data[i]._id+'"><span  class="label label-danger"><i title="Unblock" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeblockStatus(\''+data[i]._id+'\',1,\'administrator\');">Unblocked</i></span></p>');
				    }else{
					arr1.push('<p id="block_'+data[i]._id+'"><span  class="label label-info"><i title="Block" style="background-repeat:no-repeat; cursor:pointer;" class="" onclick="changeblockStatus(\''+data[i]._id+'\',0,\'administrator\');">Blocked</i></span></p>');
				    }*/
					arr1.push('<a href="/admin/administrator/edit/'+data[i]._id+'" data-original-title="edit" title="edit" data-toggle="tooltip"><button class="btn btn-circle text-inverse" type="button"><i class="fa fa-pencil"></i> </button></a>'+'<a href="javascript:void(0)" data-original-title="close" title="close" data-toggle="tooltip" onclick="delete_data_user(this,\'administrator\')" id="'+data[i]._id+'">&nbsp;&nbsp;<button class="btn btn-circle text-danger" type="button"><i class="fa fa-close"></i></button></a>');

					arr.push(arr1);

			}
			obj.data = arr;
			res.send(obj);
		});
	},

	change_status : function(req,res){
		var rid = req.body.id?req.body.id:'';	
		return model.admin.updateOne({_id: rid}, {
        		status: parseInt(req.body.st)?true:false
	        },function(err,data){
	        	if(err) console.error(err);
	        	if(req.body.st=='1'){
	        		res.send('<span  class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+rid+'\',0,\'role\');">Active</i></span>');
	   			}
	   			else{
	   				res.send('<span  class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+rid+'\',1,\'role\');">Inactive</i></span>');
	   			}
	    })
	},

	change_all_status:function(req,res){
		var action_change = req.body.action_change?req.body.action_change:0;
		var action_check = req.body.action_check?req.body.action_check:[];
		if(action_change == "2"){
			model.admin.updateMany({_id: {$in :action_check}}, {deleted_at: 1},function(err,data){
				res.json({status:"ok"});
	        });
		}

		if(action_change == "1" || action_change == "0"){
			var st = (action_change==1)?true:false;
			model.admin.updateMany({_id: {$in :action_check}}, {status: st},function(err,data){
				res.json({status:"ok"});
	        });
		}
	},

	edit:function(req,res){if(req.method == "GET"){
		model.admin.findOne({_id:req.input('id')}).exec(function(err,admindata){
			model.role.find({deleted_at:0,status:true}).sort({"role_title":"ASC"}).exec(function (err, adminrole) {
				res.render('admin/administrator/edit.ejs',{layout:'admin/layout/layout',role :adminrole,usr:admindata} );
			});
		});			
		}else{
			var data_admin = {
				superadmin :false,
				fname : req.input("name"),
				lname : req.input("lname"),
				image :'',
				email : req.input("email"),
				user : req.input("username"),				
				role : req.input("role_id"),											
			};
			if(req.input("password")){
				data_admin.password = bcrypt.hashSync(req.input("password"));
			}
			model.admin.updateOne({_id:req.input('id')},data_admin,function(err,data){
				if(err) console.error(err);			        	
	        	req.flash('message', req.__('Admin has been updated Successfully'));
				return res.redirect('/admin/administrator')
			});
		}

	},

	delete : function(req,res){
		 return model.admin.updateOne({_id: req.input("id")}, {
            deleted_at: 1
        },function(err,data){        	
        	if(err) console.error(err);
        	res.send('done')
        })
	},
	unique_email:function(req,res){	
		var email = req.input('email');
		var id = req.input('id');
		var search = {deleted_at:0,email:email};
		if(id){
			search._id = {$ne:id}
		}
		model.admin.find(search).exec(function(err,data_role){
			if(data_role && data_role.length>0){
				var valid = {valid : false, message: req.__('This email already exist')};
				res.json(valid);
			}else{
				var valid = {valid : true};
				res.json(valid)
			}
		})
	},

	unique_user:function(req,res){	
		var user = req.input('username');
		var id = req.input('id');
		var search = {deleted_at:0,user:user};
		if(id){
			search._id = {$ne:id}
		}
		model.admin.find(search).exec(function(err,data_role){
			if(data_role && data_role.length>0){
				var valid = {valid : false, message: req.__('This user already exist')};
				res.json(valid);
			}else{
				var valid = {valid : true};
				res.json(valid)
			}
		})
	}
		
	
	
}