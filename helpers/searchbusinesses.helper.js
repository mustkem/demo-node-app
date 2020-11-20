var model  = require('../models/index.model');
var config = require('../config/index');
var mongoose = require('mongoose');
var async = require("async");
const { exec } = require('child_process');
const fs = require("fs"); 

module.exports = {
		index:function(req,cb){
		var statevalue = req.input("state")?req.input("state"):[];
		var county = req.input("county")?req.input("county"):[];
		var city = req.input("city")?req.input("city"):[];
		var company = req.input("company")?req.input("company"):[];
		var limit = req.input("downloderecord")?parseInt(req.input("downloderecord")):100;
		var userid = req.session.ECOMEXPRESSUSERID?req.session.ECOMEXPRESSUSERID:"";
		var datavalue={};
		var condition ={};
		if(statevalue.length >0)
		{
			if(typeof statevalue =="string")
			{
				statevalue =[statevalue];
			}
			condition.State={ $in:statevalue};
		}

		if(county.length >0)
		{
			if(typeof county =="string")
			{
				county =[county];
			}
			condition.County={ $in:county};
		}
		if(city.length >0)
		{
			if(typeof city =="string")
			{
				city =[city];
			}

			condition.City={ $in:city};
		}if(company.length >0)
		{
			if(typeof company =="string")
			{
				company =[company];
			}
			condition.Company={ $in:company};
		}
		datavalue.condition = condition;
		datavalue.userid = userid;
		datavalue.limit = limit;
		cb(null,datavalue);
},

		exportscsv : function(record,cb)
		{
			
			var userid = record.userid?record.userid:"";
			var limit = record.limit?record.limit:10;
			var idsdata = record.idsdata?record.idsdata:"";
					var keys = record.keys?record.keys:"";
					var db = process.env.DATABASE?process.env.DATABASE:"onlinedb";
					var date = new Date();
					var timestamp = date.getTime();
					var csvname = userid+''+timestamp+'.csv';
					var exportfilename = config.constant.EXPORTBUSINESSCSVPATH+userid+'/'+csvname;
					var userid = record.userid?record.userid:"";
					exec('mongoexport --db '+db+' --collection '+userid+' -f '+keys+' --type csv >'+exportfilename+' ', (err, stdout, stderr) => {
									  if (err) {
									    console.error(err);
									    return;
									  }  

								var stats = fs.statSync(exportfilename);
								var fileSizeInBytes = stats.size;
								//Convert the file size to megabytes (optional)
								var fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
									var insertrecord ={};
									insertrecord.export_ids = idsdata?idsdata:[];
									insertrecord.filesize = fileSizeInMegabytes?fileSizeInMegabytes:'';
									insertrecord.userid = userid?userid:"";
									insertrecord.filterdata = record.condition?record.condition:"";
									insertrecord.csvname = csvname?csvname:"";
									insertrecord.exportquantity = limit?limit:100;
									
									model.businessesexporthistory.create(insertrecord,function(err,insdata){
									
									mongoose.connection.db.dropCollection(userid, function(err, result)
									 {
									 	cb(null,record);
									 });
					               })	 
							});
		}
}
