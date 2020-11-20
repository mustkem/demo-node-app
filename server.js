var express = require('express');
var i18n = require("i18n");
require('dotenv').config()
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var constant = require('./config/constant.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var flash = require('connect-flash');
var fileUpload =require('express-fileupload');
var layout = require('express-layout');
var path = require("path");
var app = express();
var config = require('./config/index');
var TMClient = require('textmagic-rest-client');
//database
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/school';

mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//locale file integrate
i18n.configure({
    locales:['en', 'ar'],
    directory: __dirname + '/locales', 
    // you may alter a site wide default locale
    defaultLocale: 'en',
});

app.get('/send_sms', (req, res)=>{
	var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
	c.Messages.send({text: 'test message', phones:'8826395416'}, function(err, result){
		console.log('Messages.send()', err, result);
		res.send("send successfully");
	});
})

//view engine
app.use(cookieParser())
app.use(layout());
app.use(flash());
app.use(i18n.init);
app.use(fileUpload());
//set js and css file

app.use(express.static('public'))

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({
			secret: 'EcomExpress',
			saveUninitialized: true,
			resave: true,
			cookie: { maxAge: 86400000 },
			store: new MongoStore({ mongooseConnection: db }),
		})
	);


var mwInput = require('./middleware/input');

app.use(mwInput());


app.use(function(req, res, next){
	res.locals.APPCONSTANT = constant;
	res.locals.success_messages = req.flash('message');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.ADMININPUT = req.input('__all__');
    res.locals.COOKIE = req.cookies;
    res.locals.SESSION = req.session;
	next();
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const adminRoutes = require('./routes/admin.routes.js');
adminRoutes(app);

var port = process.env.PORT || 2005;
app.listen(port,function()
{
	console.log("Example app listening on port: "+port	);
})
