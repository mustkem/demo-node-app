var indexController = require('../../controllers/admin/administrator/index.controller');
var config = require('../../config/index');
var isloggedin = config.middleware.isloggedin;
module.exports = function(router) {
	router.all('/admin/administrator',isloggedin, indexController.index); 
    router.all('/admin/administrator/add',isloggedin, indexController.add); 
    router.all('/admin/administrator/edit/:id',isloggedin, indexController.edit); 
    router.all('/admin/administrator/delete/:id',isloggedin, indexController.delete); 
    router.all('/admin/administrator/all_administrator', indexController.all_administrator);   
    router.all('/admin/administrator/change_status',isloggedin, indexController.change_status);  
    router.all('/admin/administrator/change_all_status',isloggedin, indexController.change_all_status);  
    router.all('/admin/administrator/unique_user',isloggedin, indexController.unique_user); 
    router.all('/admin/administrator/unique_email',isloggedin, indexController.unique_email); 
}