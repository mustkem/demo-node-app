var indexController = require('../../controllers/admin/section/index.controller');
var config = require('../../config/index');
var isloggedin = config.middleware.isloggedin;
module.exports = function(router) {
 router.all('/admin/section', isloggedin, indexController.index); 
 router.all('/admin/section/all', isloggedin, indexController.all);
 router.all('/admin/section/add', isloggedin, indexController.add);
 router.all('/admin/section/edit/:id', isloggedin, indexController.edit);
 router.all('/admin/section/delete/:id',isloggedin, indexController.delete); 
 router.all('/admin/section/change_status',isloggedin, indexController.change_status);  
 router.all('/admin/section/change_all_status',isloggedin, indexController.change_all_status);
}
