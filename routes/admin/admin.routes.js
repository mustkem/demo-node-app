const adminController = require('../../controllers/admin/admin.controller');
var config = require('../../config/index');
var isloggedinadmin = config.middleware.isloggedinadmin;

module.exports = function(router) {
    router.all('/admin',isloggedinadmin, adminController.index);   
    router.all('/admin/create', adminController.create);   
    router.get('/admin/logout', adminController.logout); 
    router.all('/admin/check_email', adminController.check_email); 
}
