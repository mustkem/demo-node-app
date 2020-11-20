var model  = require('../models/index.model');
var config = require('../config/index');
var async = require("async");
var Twitter = require('twitter');
var cheerio = require('cheerio');
var request = require('request');


const insData = (detail,callback)=>{	
			var count = 10;
			model.channel.findOne({name:detail.name}).exec(function(err,data_channel){
				var credentials = config.constant.twitterauth;
				var client = new Twitter(credentials);					
				var turl = data_channel.twitter_url?data_channel.twitter_url:'';
				var scr_name = turl.split('/');
				var params = {screen_name: scr_name[scr_name.length-1],exclude_replies:true,count:count, tweet_mode:"extended"};
				
				if(data_channel.since_id){
					params.since_id=data_channel.since_id;
				}
				if(data_channel.max_id){
					params.max_id=data_channel.max_id;
				}
				console.log(params);
				
				client.get('statuses/user_timeline', params, function(error, tweets, response) {	
					
					
					if(tweets && tweets.length>0){
						console.log(tweets.length)
					var upd = {max_id:tweets[tweets.length-1].id};
						if(data_channel.oldsince_id == 0){
							upd.oldsince_id = tweets[0].id;
						}				
						
						model.channel.updateOne({_id:data_channel._id}, upd, function(err,data_upd){
							if(err){console.log(err)}
								var newsdata = [];
								async.eachSeries(tweets,function(tw,callback){
									var entities = tw.entities?tw.entities.urls:{};					
									var expanded_url = (entities.length)?entities[0].expanded_url:'';					
									var detail = {
										newadate:tw.created_at,
										title:tw.full_text,
										tid:tw.id,
										tid_str:tw.id_str,
										expanded_url:expanded_url,
										screen_name:params.screen_name,
										webtitle:'',
										webdesc:'',
										webimage:'',
										scrap:0,
										entities:tw.entities?tw.entities:null,
										extended_entities:tw.extended_entities?tw.extended_entities:null
									}
									newsdata.push(detail);
									callback();


								},function(err){
								 	model.news.insertMany(newsdata, { ordered: false }, function(err,data_news){
										if(tweets[tweets.length-1].id>data_channel.since_id){	
											insData(detail,(err,res)=>{

												console.log(res)
											})
										}else{
											callback(null,false);
										}
									})
								})


						
							
						});
					}else{
							model.channel.updateOne({_id:data_channel._id}, {oldsince_id:data_channel.since_id}, function(err,data_upd){
								callback(null,false);
							})
						
					}
				});
			});

}

module.exports = {
	index:function(req,cb){
		var channel = req.input('channel');
		var since_id = req.input('since_id')?req.input('since_id'):0;
		var detail = {name:req.input('name')};
		model.channel.findOne(detail).exec(function(err,data_channel){
			model.channel.updateOne({_id:data_channel._id},{since_id:data_channel.oldsince_id,oldsince_id:0,max_id:0}).exec(function(err,data){
				insData(detail,(err,res)=>{

					cb(res);

				})
			});
		})
	},

	insert_news:function(tweets,cb){
		async.eachSeries(tweets,function(tw,callback){
			var entities = tw.entities?tw.entities.urls:{};					
			var expanded_url = (entities.length)?entities[0].expanded_url:'';					
			var detail = {
				title:tw.full_text,
				tid:tw.id,
				tid_str:tw.id_str,
				expanded_url:expanded_url,
				screen_name:params.screen_name,
				webtitle:'',
				webdesc:'',
				webimage:'',
				scrap:0,
				entities:tw.entities?tw.entities:null,
				extended_entities:tw.extended_entities?tw.extended_entities:null
			}
			newsdata.push(detail);
			callback();
		},function(err){
			model.news.insertMany(newsdata, { ordered: false }, function(err,data_news){
				if(err){console.log(err)}
				cb(newsdata)
			})					
		})
	}
}