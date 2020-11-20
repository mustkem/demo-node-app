var indexController = require('../../controllers/admin/user/index.controller');
var config = require('../../config/index');
var isloggedin = config.middleware.isloggedin;
module.exports = function(router) {
 router.all('/admin/user', isloggedin, indexController.index); 
 router.all('/admin/user/all', isloggedin, indexController.all);
 router.all('/admin/user/add', isloggedin, indexController.add);
 router.all('/admin/user/edit/:id', isloggedin, indexController.edit);
 router.all('/admin/user/delete/:id',isloggedin, indexController.delete); 
 router.all('/admin/user/change_status',isloggedin, indexController.change_status);  
 router.all('/admin/user/change_all_status',isloggedin, indexController.change_all_status);
}