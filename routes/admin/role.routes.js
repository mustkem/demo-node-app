var indexController = require('../../controllers/admin/role/index.controller');
var config = require('../../config/index');
var isloggedin = config.middleware.isloggedin;
module.exports = function(router) {
	router.all('/admin/role',isloggedin, indexController.index); 
    router.all('/admin/role/add',isloggedin, indexController.add); 
    router.all('/admin/role/edit/:id',isloggedin, indexController.edit); 
    router.all('/admin/role/delete/:id',isloggedin, indexController.delete); 
    router.all('/admin/role/all_role', indexController.all_role);   
    router.all('/admin/role/change_status',isloggedin, indexController.change_status);  
    router.all('/admin/role/change_all_status',isloggedin, indexController.change_all_status); 
    router.all('/admin/role/unique_role',isloggedin, indexController.unique_role); 
}