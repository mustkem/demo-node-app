var indexController = require('../../controllers/admin/class/index.controller');
var config = require('../../config/index');
var isloggedin = config.middleware.isloggedin;
module.exports = function(router) {
 router.all('/admin/class', isloggedin, indexController.index); 
 router.all('/admin/class/all', isloggedin, indexController.all);
 router.all('/admin/class/add', isloggedin, indexController.add);
 router.all('/admin/class/edit/:id', isloggedin, indexController.edit);
 //router.post('/admin/class/get_section', indexController.get_section);
 router.all('/admin/class/delete/:id',isloggedin, indexController.delete); 
 router.all('/admin/class/change_status',isloggedin, indexController.change_status);  
 router.all('/admin/class/change_all_status',isloggedin, indexController.change_all_status);
 router.all('/admin/class/get_section', indexController.get_section); 
 
 router.all('/admin/class/check_class_edit/:id', indexController.check_class_edit); 
 router.all('/admin/class/check_class', indexController.check_class); 
}
