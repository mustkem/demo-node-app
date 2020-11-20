var model  = require('../../../models/index.model');
var config = require('../../../config/index');
var async = require("async");
var bcrypt = require("bcrypt-nodejs");
var ObjectId = require('mongodb').ObjectId;
var self= module.exports  = {
	index:(req,res)=>{
		config.helpers.permission('class', req, (err,permission)=>{
			res.render('admin/class/view.ejs',{layout:'admin/layout/layout',permission:permission} );
		});
	},
	 
   all	:	(req,res)=>{
		var search = {deleted_at:0}
		var search_val = req.input('search')?req.input('search')['value']:''
		if(search_val){			
                   search.name = { $regex: '.*' + search_val + '.*',$options:'i' }
		}
		var seq = req.input('order')?req.input('order'):[{}]
		//sorting
		var sort_json = {0:"createdAt",1:"name"};
		var col = sort_json[seq[0]['column']];
		var dir = seq[0]['dir'];
		if(req.input('order')[0]['column']==0){
	      dir = 'DESC';
	    }	    
		var skip = req.input('start')?parseInt(req.input('start')):0;
		var limit=req.input('length')?parseInt(req.input('length')):10;
        var countData = new Promise((resolve, reject) => {
		var count=model.class.countDocuments(search);
		  resolve(count);
		});
		var fetchData = new Promise((resolve, reject) => {
		  var data=model.class.find(search).skip(skip).limit(limit);
		  resolve(data);
		});
		 Promise.all([countData,fetchData])
			 .then((results)=> {
			   var obj = {
			draw:req.input('draw'),
				recordsTotal:results[0],
				recordsFiltered:results[0],
				//data:await self.alldata(results)
			};
			config.helpers.permission('class', req, (err,perdata)=>{
				self.datatable(skip,perdata,results[1],(detail)=>{
					obj.data = detail;
					res.send(obj);
				})
			})
                 })
                 .catch(error => console.log(`Error in executing ${error}`))
		
	},
        datatable:(skip,perdata,alldata,cb)=>{
		
			var arr =[];
			var i = parseInt(skip)+1;
			if(alldata.length>0){
				async.eachSeries(alldata,(item,callback)=>{
					var arr1 = [];
					arr1.push('<input type="checkbox" name="action_check[]" class="all_check" value="'+item._id+'">');				
					arr1.push(item.name?item.name:'--');
					if(!item.status){
						change_status = "changeStatus(\'"+item._id+"\',1,\'class\');";						
						var rid = item._id;
						arr1.push('<p id="status_'+item._id+'"><span class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="'+change_status+'">Inactive</i></span></p>');
					}else{
						change_status = "changeStatus(\'"+item._id+"\',0,\'class\');";
						arr1.push('<p id="status_'+item._id+'"><span class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="'+change_status+'">Active</i></span></p>');
					}
					var $but_edit = '-';
					if(perdata.edit=='1'){
						$but_edit = '<a href="/admin/class/edit/'+item._id+'" title="edit"><button class="btn btn-circle text-inverse" type="button"><i class="fa fa-pencil"></i> </button></a>';
					}
					var $but_delete = ' - ';
					if(perdata.delete =='1'){
						$but_delete = '<a href="javascript:void(0)" title="close" onclick="delete_data_all(this,\'class\',\'all\')" id="'+item._id+'">&nbsp;&nbsp;<button class="btn btn-circle text-danger" type="button"><i class="fa fa-close" ></i></button></a>';
					}
					arr1.push($but_edit+$but_delete);							
					
					arr.push(arr1);
					callback()
				},(err)=>{			
					cb(arr);
				})

			}else{
				cb(arr);
			}
	},

	add:function(req,res){
		if(req.method == "GET"){			
				config.helpers.permission('user', req, function(err,permission){
					res.render('admin/class/add.ejs',{layout:'admin/layout/layout',permission:permission} );
				})
		}else{
				var data = {
					name:req.input('name'),
					createdby:req.session.ECOMEXPRESSADMINID,
					status:true,
					deleted_at:0
				}
				
			        model.class.create(data,function(err,insdata){
					if(err){console.log(err)}
				req.flash('message', req.__('Your account has been created successfully'));
				res.redirect('/admin/class')
                                })
			
		}
	},

	edit:function(req,res){
		var id = req.input('id');
		model.class.findOne({_id:id}).exec(function(err,detail){
			if(req.method == "GET"){
				if(detail){			
					config.helpers.permission('class', req, function(err,permission){
						res.render('admin/class/edit.ejs',{layout:'admin/layout/layout',permission:permission,detail:detail} );
					})
				}else{
					res.redirect('/admin/class')
				}
			}else{
                               
				var data = {
					name : req.input('name')					
				}
				model.class.updateOne({_id:id},data).exec(function(err,data_upd){
					req.flash('message', req.__('Data has been updated Successfully'));
					return res.redirect('/admin/class');		
				})
			}
		})
	},
            

	change_status : function(req,res){
		var rid = req.input('id')?req.input('id'):'';	
		return model.class.updateOne({_id: rid}, {
        		status: parseInt(req.body.st)?true:false
	        },function(err,data){
	        	if(err) console.error(err);
	        	if(req.body.st=='1'){
	        		res.send('<span  class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+rid+'\',0,\'class\');">Active</i></span>');
	   			}
	   			else{
	   				res.send('<span  class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+rid+'\',1,\'class\');">Inactive</i></span>');
	   			}
	    })
	},

	change_all_status:function(req,res){
		var action_change = req.input('action_change')?req.input('action_change'):0;
		var action_check = req.input('action_check')?req.input('action_check'):[];
		if(action_change == "2"){
			model.class.updateMany({_id: {$in :action_check}}, {deleted_at: 1},function(err,data){
				res.json({status:"ok"});
	        });
		}

		if(action_change == "1" || action_change == "0"){
			var st = (action_change==1)?true:false;
			model.class.updateMany({_id: {$in :action_check}}, {status: st},function(err,data){
				res.json({status:"ok"});
	        });
		}
	},

	delete : function(req,res){
		 return model.class.updateOne({_id: req.input("id")}, {
            deleted_at: 1
        },function(err,data){        	
        	if(err) console.error(err);
        	res.send('done')
        })
	},
	
	get_section : async (req, res) => {
		var data = await model.section.find({ class_id : new ObjectId(req.body.class_id), deleted_at : 0, status : true });
		res.send(data);
	},
	
	check_class : function(req, res) {
		model.class.findOne({name: req.input('name')}).exec(function(err,user){
		if(err){console.log(err)}
			if(user){	
				res.json({"valid": false,"message":req.__("This class name already exists, please choose another")})
			}else{
				res.json({"valid":true})
			}
		})
	},
	
		
	check_class_edit : function(req, res) {
		model.class.findOne({ _id :{ $ne: new ObjectId(req.input('id'))}, name: req.input('name')}).exec(function(err,user){
		if(err){console.log(err)}
			if(user){	
				res.json({"valid": false,"message":req.__("This class name already exists, please choose another")})
			}else{
				res.json({"valid":true})
			}
		})
	}
}
