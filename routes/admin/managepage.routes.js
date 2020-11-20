const managepageController = require('../../controllers/admin/managepage/index.controller')
const config = require('../../config/index');
const isloggedin = config.middleware.isloggedin;
module.exports  = (router)=>{

    router.all('/admin/managepage',isloggedin,managepageController.index);
    router.all('/admin/managepage/all_pages',isloggedin,managepageController.all_pages);
    router.all('/admin/managepage/add',isloggedin,managepageController.add);
    router.all('/admin/managepage/edit/:id',isloggedin,managepageController.edit);
    router.all('/admin/managepage/change_status',isloggedin,managepageController.change_status);
    router.all('/admin/managepage/delete/:id',isloggedin,managepageController.delete);
    router.all('/admin/managepage/change_all_status',isloggedin,managepageController.change_all_status);

}
