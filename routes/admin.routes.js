var express = require('express');

module.exports = function(app) {

	//routes defaile
	var adminRoutes = require('./admin/admin.routes');
	var administrator = require('./admin/administrator.routes');
	var roleRoutes = require('./admin/role.routes');
	var dashboardRoutes = require('./admin/dashboard.routes');
	
	var userRoutes = require('./admin/user.routes');
	var smsRoutes = require('./admin/sms.routes');
	var classRoutes = require('./admin/class.routes');
	var sectionRoutes = require('./admin/section.routes');
		
	var managepageRoutes = require('./admin/managepage.routes');	
        //import express
	var router = express.Router();
	app.use('',router);

	//import admin routes
	adminRoutes(router);
	dashboardRoutes(router);
	administrator(router);
	roleRoutes(router);	
	userRoutes(router);
	smsRoutes(router);
	classRoutes(router);
	sectionRoutes(router);
	managepageRoutes(router);
}
