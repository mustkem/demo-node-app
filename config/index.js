module.exports = {
	//connection : require('./connection.js'),
	constant   : require('./constant.js'),
	middleware : require('../middleware/isloggedin.js'),
	transporter : require('../middleware/transportemail.js'),
}
//helper call
var helpers = {};
const path = require("path");
const fs = require('fs');
const modelsPath = path.resolve(__dirname, '../helpers')

fs.readdirSync(modelsPath).forEach(file => {
 var m_name = file.split(".")[0]; 	
 	helpers[m_name] = require(modelsPath + '/' + file);
 
});

module.exports.helpers = helpers;
