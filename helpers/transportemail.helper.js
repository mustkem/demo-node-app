var model  = require('../models/index.model');
var config = require('../config/index');
var mongoose = require('mongoose');
var async = require("async");

module.exports = function(mailOptions,cb) {
	let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'sparxproducts@gmail.com',
              pass: 'Sparx@sparx'
          }
      });
	transporter.sendMail(mailOptions, function(error, info){
	   	console.log(error);
	   	cb(info);
   });
}