var model  = require('../models/index.model');
var config = require('../config/index');
var mongoose = require('mongoose');
var async = require("async");

var im = require('imagemagick');
module.exports = function(detail_img) {
	var arrresize = detail_img?detail_img.resize:[];
	async.forEach(arrresize,function(item,callback){
		var original = detail_img.original+detail_img.image;
		var desti = item.path+detail_img.image
		var width = item.size.width;
	    var height = item.size.height;
	    var rsize = width+'x'+height;
	    console.log("=========================")
	    console.log("rsize=="+rsize)
	    console.log("original=="+original)
	    console.log("desti=="+desti)
	    console.log("=========================")	    
	    im.convert([original, '-resize', rsize+'!', desti]);
	    callback();
	},function(err){
		return 1;
	})
	
}


