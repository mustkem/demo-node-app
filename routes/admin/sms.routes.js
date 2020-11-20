var indexController = require('../../controllers/admin/sms/index.controller');
var config = require('../../config/index');
var isloggedin = config.middleware.isloggedin;
module.exports = function(router) { 
 router.all('/admin/sms/add', isloggedin, indexController.add);  
}
