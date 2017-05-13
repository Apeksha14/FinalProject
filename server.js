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

// Requiring our Note and Article models

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
var School = require("./models/School.js");
mongoose.Promise = Promise;
var routes = require('./routes/index');
var users = require('./routes/users');
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

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
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

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/public/index.html");
});

let parseString = require('xml2js').parseString;



app.post("/apidata",function(req,res){

  console.log("apidata");
  console.log(req.body);
  var url;
 
  if((req.body.type) && (req.body.level === null))
  {
    url = 'https://api.greatschools.org/schools/'+req.body.state+'/'+req.body.city+'/'+req.body.type+'?key=a5ycuqrxsukeztxwmxdowwxx&sort=parent_rating';
  }
  else if((req.body.type === null) && (req.body.level))
  {
    url = 'https://api.greatschools.org/schools/'+req.body.state+'/'+req.body.city+'/'+req.body.level+'?key=a5ycuqrxsukeztxwmxdowwxx&sort=parent_rating';
  }
  else
  {
    url = 'https://api.greatschools.org/schools/'+req.body.state+'/'+req.body.city+'?key=a5ycuqrxsukeztxwmxdowwxx&sort=parent_rating';
  }

  console.log(url);
  request(url, function (error, response, body) {
  
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(body);
  parseString(body, function (err, result) {
  //console.log(result);
  res.send(result);
});
  

  });

  

});


app.post("/nearbyschools",function(req,res){

  console.log("nearbyschools");
  console.log(req.body);
  var url;
 
  if(req.body.state)
  {
  url = 'http://api.greatschools.org/schools/nearby?key=a5ycuqrxsukeztxwmxdowwxx&&state='+req.body.state+'&zip='+req.body.zipcode+'&radius='+req.body.radius+'&limit='+req.body.limit;
  }
  console.log(url);
  request(url, function (error, response, body) {
  
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(body);
  parseString(body, function (err, result) {
  //console.log(result);
  res.send(result);
});
  

  });

  

});

app.post("/profile",function(req,res){

  console.log("profile");
  console.log(req.body);
    console.log(req.body.id);

  var url;
 
  if(req.body.state)
  {
  url = 'http://api.greatschools.org/schools/'+req.body.state+'/'+req.body.id+'?key=a5ycuqrxsukeztxwmxdowwxx';
;
  }
  console.log(url);
  request(url, function (error, response, body) {
  
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  //console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(body);
  parseString(body, function (err, result) {
  //console.log(result);
  res.send(result);
});
  

  });

  

});

app.post('/search', function(req, res) {
  console.log("postsearch");
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

for (var key in req.body) {

  if (req.body.hasOwnProperty(key)) {

    item = req.body[key];

    var school = new School({"schoolname":item.name,"type":item.type,"address":item.address});
   
    school.save(function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
    
    });
    
  }
}

});
// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
