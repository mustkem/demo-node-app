var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/school';
mongoose.connect(mongoDB, { useNewUrlParser: true,useFindAndModify :false });
var db = mongoose.connection;
console.log(db);
module.exports =  db;
