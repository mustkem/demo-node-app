var model  = require('../../../models/index.model');
var config = require('../../../config/index');
var db 	   = config.connection;
var async = require("async");
var Role = model.role;
module.exports = {
	index:function(req,res){
		model.role.find({deleted_at:0}).exec(function(err,data_role){
			res.render('admin/role/view.ejs',{layout:'admin/layout/layout', data_role:data_role} );
		})
	},
	add:function(req,res){
		if(req.method == "GET"){
			model.menu.find({},function (err, allmenu) {
				res.render('admin/role/add.ejs',{layout:'admin/layout/layout', menu:allmenu} );
			});
		}else{
			var menuCheck = req.body.menuCheck;

					var arrayData = [];
					for (var key in menuCheck) {
						if (typeof menuCheck[key] == "string") {
			               var obj = {
			                  "id": menuCheck[key],
			                  "add": req.body["menuCheck_"+menuCheck[key]+"_add"]?req.body["menuCheck_"+menuCheck[key]+"_add"]:'1',
			                  "edit": req.body["menuCheck_"+menuCheck[key]+"_edit"]?req.body["menuCheck_"+menuCheck[key]+"_edit"]:'0',
			                  "delete": req.body["menuCheck_"+menuCheck[key]+"_delete"]?req.body["menuCheck_"+menuCheck[key]+"_delete"]:'0',
			               };
			                arrayData.push(obj);
			            }
			            else if(typeof menuCheck[key] == "object"){
			            	for (var i = 0; i < menuCheck[key].length; i++) {
				                  var obj = {
				                     "id": menuCheck[key][i],
				                     "add": req.body["menuCheck_"+menuCheck[key][i]+"_add"]?req.body["menuCheck_"+menuCheck[key][i]+"_add"]:'0',
				                     "edit": req.body["menuCheck_"+menuCheck[key][i]+"_edit"]?req.body["menuCheck_"+menuCheck[key][i]+"_edit"]:'0',
				                     "delete": req.body["menuCheck_"+menuCheck[key][i]+"_delete"]?req.body["menuCheck_"+menuCheck[key][i]+"_delete"]:'0',
				                  };
				                  arrayData.push(obj);
				               }
			            }
					}
					var New_role = new Role({
						role_title :req.body.name,
						role_desc : req.body.role_desc,
						type:"subadmin",
						permission : arrayData,						
						deleted_at : 0,
						status : true
					});
				New_role.save(function(err,roledata){
					if(err){console.log(err)}
					req.flash('msg', {msg:'Data has been Inserted Successfully',status:false});	
					res.redirect('/admin/role')
					//res.json('sasdf')
				})
		}		
	},

	all_role:function(req,res){
		var search = {deleted_at:0,type:{$ne:"ADMIN"}}
		var cat_id = req.body.cat_id;
		var search_val = req.body.search.value;
		if(search_val){			
            search.role_title = { $regex: '.*' + search_val + '.*',$options:'i' }
		}
		var seq = req.body.order?req.body.order:[{}]
		//sorting
		var sort_json = {0:"createdAt",1:"role_title"};
		var col = sort_json[seq[0]['column']];
		var dir = seq[0]['dir'];
		if(req.body.order[0]['column']==0){
	      dir = 'DESC';
	    }
		
		var skip = req.input('start')?parseInt(req.input('start')):0;
		var limit=req.input('length')?parseInt(req.input('length')):10;
		async.parallel({
		    count:function(callback) {
		        model.role.countDocuments(search).exec(function(err,data_count){
		        	callback(null,data_count)
		        })
		    },
		    data:function(callback) {		    
		    	model.role.find(search).skip(skip).limit(limit).exec(function(err,data){
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
					arr1.push('<input type="checkbox" name="action_check[]" class="all_check" value="'+data[i]._id+'">');
					arr1.push(data[i].role_title);
					if(!data[i].status){
						change_status = "changeStatus(\'"+data[i]._id+"\',1,\'role\');";						
						var rid = data[i]._id;
						arr1.push('<p id="status_'+data[i]._id+'"><span class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="'+change_status+'">Inactive</i></span></p>');
					}else{
						change_status = "changeStatus(\'"+data[i]._id+"\',0,\'role\');";
						arr1.push('<p id="status_'+data[i]._id+'"><span class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="'+change_status+'">Active</i></span></p>');
					}
					var $but_edit = '-';
					if(perdata.edit=='1'){
					$but_edit = '<a href="/admin/role/edit/'+data[i]._id+'" title="edit"><button class="btn btn-circle text-inverse" type="button"><i class="fa fa-pencil"></i> </button></a>';
					}
					var $but_delete = ' - ';
					if(perdata.delete =='1'){
						$but_delete = '<a href="javascript:void(0)" title="close" onclick="delete_data_all(this,\'role\',\'all_role\')" id="'+data[i]._id+'">&nbsp;&nbsp;<button class="btn btn-circle text-danger" type="button"><i class="fa fa-close" ></i></button></a>';
					}
					arr1.push($but_edit+$but_delete);
					arr.push(arr1);

			}
			obj.data = arr;
			res.send(obj);
		});
	},

	change_status : function(req,res){
		var rid = req.body.id?req.body.id:'';	
		return model.role.updateOne({_id: rid}, {
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
			model.role.updateMany({_id: {$in :action_check}}, {deleted_at: 1},function(err,data){
				res.json({status:"ok"});
	        });
		}

		if(action_change == "1" || action_change == "0"){
			var st = (action_change==1)?true:false;
			model.role.updateMany({_id: {$in :action_check}}, {status: st},function(err,data){
				res.json({status:"ok"});
	        });
		}
	},

	edit:function(req,res){
		var id = req.input('id');
		if(req.method =="POST"){
			var menuCheck = req.input("menuCheck");
					var arrayData = [];

					for (var key in menuCheck) {
						
						if (typeof menuCheck[key] == "string") {
			               var obj = {
			                  "id": menuCheck[key],
			                  "add": req.input("menuCheck_"+menuCheck[key]+"_add")?req.input("menuCheck_"+menuCheck[key]+"_add"):'1',
			                  "edit": req.input("menuCheck_"+menuCheck[key]+"_edit")?req.input("menuCheck_"+menuCheck[key]+"_edit"):'0',
			                  "delete": req.input("menuCheck_"+menuCheck[key]+"_delete")?req.input("menuCheck_"+menuCheck[key]+"_delete"):'0',
			               };
			                arrayData.push(obj);
			            }
			            else if(typeof menuCheck[key] == "object"){
			            	for (var i = 0; i < menuCheck[key].length; i++) {
				                  var obj = {
				                     "id": menuCheck[key][i],
				                     "add": req.input("menuCheck_"+menuCheck[key][i]+"_add")?req.input("menuCheck_"+menuCheck[key][i]+"_add"):'0',
				                     "edit": req.input("menuCheck_"+menuCheck[key][i]+"_edit")?req.input("menuCheck_"+menuCheck[key][i]+"_edit"):'0',
				                     "delete": req.input("menuCheck_"+menuCheck[key][i]+"_delete")?req.input("menuCheck_"+menuCheck[key][i]+"_delete"):'0',
				                  };
				                  arrayData.push(obj);
				               }
			            }
					}
					
			 
			   model.role.updateOne(
			   		{_id: req.input("id")},
			 		{	role_title : req.input("name"),
						role_desc : req.input("role_desc"),
						permission : arrayData,						
					},function(err,data){			
					// console.log("================================")
					// console.log(req.input("id"))
					// console.log("================================")
					// res.json(arrayData);					
			        	if(err) console.error(err);			        	
			        	req.flash('message', req.__('Role has been added Successfully'));
						return res.redirect('/admin/role');				
					});
       		
		}else{
			model.role.findOne({_id: id}, function(err, adminrole){
				if(err) console.error(err);
				
				model.menu.find({status:true}).sort({order:'ASC'}).exec(function (err, allmenu){
					
				//Menu.find(function (err, allmenu) {
					if(err) console.error(err);
					var permission = adminrole.permission;
					
					for (var i = 0; i < allmenu.length; i++) {
	                    for(var j=0;j<permission.length;j++){
	                       if (allmenu[i].id == permission[j].id) {
	                          allmenu[i].add = permission[j].add;
	                          allmenu[i].delete = permission[j].delete;
	                          allmenu[i].edit = permission[j].edit;
	                       }

	                       if(allmenu[i].submenu && allmenu[i].submenu.length) {
	                          for(var k=0;k<allmenu[i].submenu.length;k++){
	                              if (allmenu[i].submenu[k].id == permission[j].id) {
	                                     allmenu[i].submenu[k].add = permission[j].add;
	                                     allmenu[i].submenu[k].delete = permission[j].delete;
	                                     allmenu[i].submenu[k].edit = permission[j].edit;
	                                  }
	                           }
	                       }
	                    }
					}
					res.render('admin/role/edit',{layout:'admin/layout/layout',menu :allmenu,role :adminrole} );
				});
			});
		}

	},

	delete : function(req,res){
		 return model.role.updateOne({_id: req.input("id")}, {
            deleted_at: 1
        },function(err,data){        	
        	if(err) console.error(err);
        	res.send('done')
        })
	},

	unique_role:function(req,res){	
		var name = req.input('name');
		var id = req.input('id');
		var search = {deleted_at:0,role_title:name};
		if(id){
			search._id = {$ne:id}
		}
		model.role.find(search).exec(function(err,data_role){
			if(data_role && data_role.length>0){
				var valid = {valid : false, message: req.__('This role title already exist')};
				res.json(valid);
			}else{
				var valid = {valid : true};
				res.json(valid)
			}
		})
	}
	
		
	
	
}