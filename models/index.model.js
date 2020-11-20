//include all models
var model = {};
const path = require("path");
const fs = require('fs');
const modelsPath = path.resolve(__dirname, '')
fs.readdirSync(modelsPath).forEach(file => {
 var m_name = file.split(".")[0];
 if(m_name!='index'){
 	model[m_name] = require(modelsPath + '/' + file);
 }
});
module.exports = model;