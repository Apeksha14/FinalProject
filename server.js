/* Scrape and Display (18.3.8)
 * (If you can do this, you should be set for your hw)
 * ================================================== */

// STUDENTS:
// Please complete the routes with TODOs inside.
// Your specific instructions lie there

// Good luck!

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var parseString = require("xml2js").parseString;


// Requiring our Note and Article models

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
var School = require("./models/School.js");
var User = require("./models/user.js");
var sess;
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());


app.use(express.static("public"));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
var userid;
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.post("/apidata",function(req,res){

  var url;
  var parameters = '/';

  for (var key in req.body) {

  if (req.body.hasOwnProperty(key)) {

    item = req.body[key];

    console.log(key+ " "+ req.body[key]);

    parameters = parameters+req.body[key]+'/';
    
  }

}
  console.log(parameters);
  url = "https://api.greatschools.org/schools"+parameters+'?key=a5ycuqrxsukeztxwmxdowwxx&sort=parent_rating';
  console.log(url);
  request(url, function (error, response, body) {
  
  parseString(body, function (err, result) {
  //console.log(result);
  res.send(result);
});
  

  });

  

});


app.post("/nearbyschools",function(req,res){

  var url;
  var parameters = 'a5ycuqrxsukeztxwmxdowwxx';

  for (var key in req.body) {

  if (req.body.hasOwnProperty(key)) {

    item = req.body[key];

    console.log(key+ " "+ req.body[key]);

    parameters = parameters+"&"+key+"="+req.body[key];
    

  }
}

url = 'https://api.greatschools.org/schools/nearby?key='+parameters;
 
request(url, function (error, response, body) {
  
  parseString(body, function (err, result) {

      res.send(result);
  });
  
});

});

app.post("/profile",function(req,res){

   var url;
  var parameters = '/';

  for (var key in req.body) {

  if (req.body.hasOwnProperty(key)) {

    item = req.body[key];

    console.log(key+ " "+ req.body[key]);

    parameters = parameters+req.body[key]+'/';
    
  }

}
  url = "https://api.greatschools.org/schools"+parameters+'?key=a5ycuqrxsukeztxwmxdowwxx';
  
request(url, function (error, response, body) {
  
  parseString(body, function (err, result) {

  res.send(result);

  });
  
});

});

app.post('/search', function(req, res) {

  res.send(__dirname + "/public/partials/faq.html");

});
// Make public a static dir

// Database configuration with mongoose

   //var uristring = process.env.MONGOLAB_URI ||  process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://heroku_z49hw4k5:jg8j247rul3ho8c8gb5qndited@ds111791.mlab.com:11791/heroku_z49hw4k5';

    //var uristring = 'mongodb://heroku_z49hw4k5:jg8j247rul3ho8c8gb5qndited@ds111791.mlab.com:11791/heroku_z49hw4k5'
    var uristring = 'mongodb://localhost/angulardb';
    var PORT = process.env.PORT || 3000;
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
    
  var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.post("/savesearch", function(req, res) {
  console.log("savesearch");
  console.log(sess);
if(sess)
{

for (var key in req.body) {

  if (req.body.hasOwnProperty(key)) {

    item = req.body[key];

    var school = new School({"userid":item.userid,"schoolname":item.name,"type":item.type,"address":item.address});
   
    school.save(function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
    
    });
    
  }
}
res.send("success");

}
else
{
  res.redirect("/login");
}


});

// Get Homepage
function ensureAuthenticated(req, res, next){
  console.log("ensureauth");
  console.log(req.isAuthenticated());
	if(req.isAuthenticated()){
    console.log("ifensureauth");
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect("/loginform");
	}
}

app.post('/register', function(req, res){
  console.log(req.body);
	var name = req.body.username;
	var password = req.body.password;
	var confirmpwd = req.body.confirmpwd;
	var email = req.body.email;
  

	// Validation
	req.checkBody('username', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirmpwd', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		console.log(errors);
    res.send(errors);



	} else {
		var newUser = new User({
			
			email:email,
			username: name,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err)

      { 
        console.log(err);
        throw err;

      }
			
		});

		req.flash('success_msg', 'You are registered and can now login');
    
		res.send(newUser);
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){

   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



app.post('/login',passport.authenticate('local',{failureRedirect:'/errorpage',failureFlash: true}),
  function(req, res) {
    console.log("sdfdsafadfadfasfasdfsd");
    sess = req.session;
    userid = req.user._id;
    sess.username=req.user.username;
    School.find({"userid":req.user._id},function(err,data){
if(err)
  console.log(err);
else
{
  //res.sendFile(path.join(__dirname, '/public/index.html'));
 // res.send(data);
 console.log(data);
}
    })
    res.send(req.user);
    
  });

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.body.username || null;
  next();
});

app.get('/logout', function(req, res){
  
  sess = null;
	
  req.logout();

	req.flash('success_msg', 'You are logged out');

  res.redirect('/');
});


// Get Homepage
app.get('/login', ensureAuthenticated, function(req, res){
  console.log("inside login");
	res.send("home");;
});

// Get Homepage
app.get('/loginform', function(req, res){
  console.log("inside loginform");
	res.send("login");
});


app.get('/errorpage',function(req,res){

  console.log(res);
  if(res.locals.error)
  {
    res.send(res.locals.error);
  }

});
// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
