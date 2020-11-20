const {SITEURL} = require('../../config/constant');
module.exports = {

    checkUserlogin : (req,res,next)=>{

        if(req.session.ECOMEXPRESSUSERID && req.session.ECOMEXPRESSUSERDETAIL){
            next();
        }else{
            res.redirect("/user/login?ref="+SITEURL+req.originalUrl)
        }
    },
    checkIsUserlogedin : (req,res,next)=>{

        if(req.session.ECOMEXPRESSUSERID && req.session.ECOMEXPRESSUSERDETAIL){
            res.redirect("/user/dashboard");
        }else{
            next();
        }

        

    },
    checkIfVendor : (req,res,next)=>{
       
        if(req.session.ECOMEXPRESSUSERDETAIL.vendor.status ==  1){
            res.redirect("/user/dashboard");  
        }else{
            next();
        }

    }

}