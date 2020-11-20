var {csmpages}  = require('../../../models/index.model');
var config = require('../../../config/index');
var async = require("async");
var self= module.exports  = {
	index:function(req,res){

		config.helpers.permission('managepage', req, function(err,permission)
		{
			res.render('admin/managepage/view.ejs',{layout:'admin/layout/layout',permission:permission} );
		});
	},

	all_pages:function(req,res){
		var search = {deleted_at:0}
		
		var search_val = req.input('search')?req.input('search')['value']:''
		if(search_val){			
            search.name = { $regex: '.*' + search_val + '.*',$options:'i' }
		}
		var seq = req.input('order')?req.input('order'):[{}]
		//sorting
		var sort_json = {0:"createdAt",1:"role_title"};
		var col = sort_json[seq[0]['column']];
		var dir = seq[0]['dir'];
		if(req.input('order')[0]['column']==0){
	      dir = 'DESC';
	    }
	   
	    var skip = req.input('start')?parseInt(req.input('start')):0;
		var limit=req.input('length')?parseInt(req.input('length')):10;

		async.parallel({
			count:function(callback) {
		        csmpages.countDocuments(search).exec(function(err,data_count){
		        	callback(null,data_count)
		        })
		    },
		    data:function(callback) {		    
		    	csmpages.find(search).skip(skip).limit(limit).exec(function(err,data){
		        	callback(null,data)
		        })		        
		    }
		},function(err,results){
			var obj = {
				draw:req.input('draw'),
				recordsTotal:results.count?results.count:0,
				recordsFiltered:results.count?results.count:0,
				//data:await self.alldata(results)
			};
			config.helpers.permission('managepage', req, function(err,perdata){
				self.datatable(skip,perdata,results.data,function(detail){
					obj.data = detail;
					res.send(obj);
				})
			})
		})
	},

	datatable:function(skip,perdata,alldata,cb){
		
			var arr =[];
			var i = parseInt(skip)+1;
			if(alldata.length>0){
				async.eachSeries(alldata,function(item,callback){
					var arr1 = [];
					arr1.push('<input type="checkbox" name="action_check[]" class="all_check" value="'+item._id+'">');	
					var image = item.page_image?config.constant.UPLOADPAGEIMAGEURL+item.page_image:config.constant.UPLOADPAGEIMAGEURL+'avatar.png';			
					arr1.push('<image src="'+image+'" style="height: 57px;width: 50px;margin-bottom: 5px;">');
					arr1.push(item.content_heading?item.content_heading:'--');
					if(!item.status){
						change_status = "changeStatus(\'"+item._id+"\',1,\'managepage\');";						
						var rid = item._id;
						arr1.push('<p id="status_'+item._id+'"><span class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="'+change_status+'">Inactive</i></span></p>');
					}else{
						change_status = "changeStatus(\'"+item._id+"\',0,\'managepage\');";
						arr1.push('<p id="status_'+item._id+'"><span class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="'+change_status+'">Active</i></span></p>');
					}
					var $but_edit = '-';
					if(perdata.edit=='1'){
						$but_edit = '<a href="/admin/managepage/edit/'+item._id+'" title="edit"><button class="btn btn-circle text-inverse" type="button"><i class="fa fa-pencil"></i> </button></a>';
					}
					var $but_delete = ' - ';
					if(perdata.delete =='1'){
						$but_delete = '<a href="javascript:void(0)" title="close" onclick="delete_data_all(this,\'managepage\',\'all_pages\')" id="'+item._id+'">&nbsp;&nbsp;<button class="btn btn-circle text-danger" type="button"><i class="fa fa-close" ></i></button></a>';
					}
					arr1.push($but_edit+$but_delete);
								
					
					arr.push(arr1);
					callback()
				},function(err){			
					cb(arr);
				})

			}else{
				cb(arr);
			}
	},

	add:function(req,res){
		if(req.method == "GET"){			
				config.helpers.permission('managepage', req, function(err,permission){
					res.render('admin/managepage/add.ejs',{layout:'admin/layout/layout',permission:permission} );
				})
		}else{
				var imgpath = config.constant.UPLOADPAGEIMAGE;
				
				async.waterfall([
						function(callback){
							if (req.files && Object.keys(req.files).length != 0) 
							{
								var imgname = Date.now()+'_'+req.files.file.name
							req.files.file.mv(imgpath+imgname, function(err,data) {
								if(err){console.log(err)}
								callback(null,imgname)
							})
							}else
							{
								callback(null,"")
							}
						},
						 function(imgname,callback){
							var data = {
							content_heading:req.input('content')?req.input('content'):"",
							short_desc:req.input('short_desc')?req.input('short_desc'):"",
							page_title:req.input('page_title')?req.input('page_title'):"",
							meta_key:req.input('meta_key')?req.input('meta_key'):"",
							meta_desc:req.input('meta_desc')?req.input('meta_desc'):"",
							page_image:imgname?imgname:"",
							deleted_at:0,
							status:1,
							};

							csmpages.create(data,function(err,insdata){
								callback(null,insdata);
							});

						}
					],function(err,result){
						if(err){console.log(err)}
						req.flash('messages', req.__('Data has been Inserted Successfully.'));							
						res.redirect('/admin/managepage');
				})
		}
	},

	edit:function(req,res){
		var id = req.input('id');
		csmpages.findOne({_id:id}).exec(function(err,detail){
			if(err){console.log(err)}
			if(req.method == "GET"){
				if(detail){			
					config.helpers.permission('managepage', req, function(err,permission){
						res.render('admin/managepage/edit.ejs',{layout:'admin/layout/layout',permission:permission,detail:detail} );
					})
				}else{
					res.redirect('/admin/managepage')
				}
			}else{


				var imgpath = config.constant.UPLOADPAGEIMAGE;
				
				async.waterfall([
						function(callback){
							if (req.files && Object.keys(req.files).length != 0) 
							{
								var imgname = Date.now()+'_'+req.files.file.name
							req.files.file.mv(imgpath+imgname, function(err,data) {
								if(err){console.log(err)}
								callback(null,imgname)
							})
							}else
							{
								callback(null,"")
							}
						},
						 function(imgname,callback){
							var data = {
							content_heading:req.input('content')?req.input('content'):"",
							short_desc:req.input('short_desc')?req.input('short_desc'):"",
							page_title:req.input('page_title')?req.input('page_title'):"",
							meta_key:req.input('meta_key')?req.input('meta_key'):"",
							meta_desc:req.input('meta_desc')?req.input('meta_desc'):"",
							page_image:req.input('page_image')?req.input('page_image'):"",
						}
						if(imgname)
						{
							data.page_image=imgname?imgname:"";
						}
				csmpages.updateOne({_id:id},data).exec(function(err,data_upd){
					if(err){console.log(err)}
					callback(null,imgname)		
				})
			}
					],function(err,result){
						if(err){console.log(err)}
						req.flash('messages', req.__('Data has been Inserted Successfully.'));							
						res.redirect('/admin/managepage');
				})
				
			}
		})
	},

	change_status : function(req,res){
		var rid = req.input('id')?req.input('id'):'';	
		return csmpages.updateOne({_id: rid}, {
        		status: parseInt(req.body.st)?true:false
	        },function(err,data){
	        	if(err) console.error(err);
	        	if(req.body.st=='1'){
	        		res.send('<span  class="label label-danger"><i title="Active" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+rid+'\',0,\'businessplan\');">Active</i></span>');
	   			}
	   			else{
	   				res.send('<span  class="label label-info"><i title="Inactive" style="background-repeat:no-repeat; cursor:pointer;" class="color_active" onclick="changeStatus(\''+rid+'\',1,\'businessplan\');">Inactive</i></span>');
	   			}
	    })
	},

	delete : function(req,res){
		 return csmpages.updateOne({_id: req.input("id")}, {
            deleted_at: 1
        },function(err,data){        	
        	if(err) console.error(err);
        	res.send('done')
        })
		},

		change_all_status:function(req,res){
		var action_change = req.input('action_change')?req.input('action_change'):0;
		var action_check = req.input('action_check')?req.input('action_check'):[];
		if(action_change == "2"){
			csmpages.updateMany({_id: {$in :action_check}}, {deleted_at: 1},function(err,data){
				res.json({status:"ok"});
	        });
		}

		if(action_change == "1" || action_change == "0"){
			var st = (action_change==1)?true:false;
			csmpages.updateMany({_id: {$in :action_check}}, {status: st},function(err,data){
				res.json({status:"ok"});
	        });
		}
	}
}