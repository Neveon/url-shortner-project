const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns'); //For dns.lookup()
const os = require("os"); //For getting hostname for dns.lookup() to work properly
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');
//Express requires extra layer middle-ware to handle POST request
//Here we configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Connect to the database
//When mongoose creates the collection shortUrl from models/shortUrl.js
//Mongoose pluralizes it -> shortUrls
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});
//useNewUrlParser removes DeprecationWarning

app.use(express.static('public'));

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

//input from client
//The '(*)' is used to ignore the server trying to get into a folder sub directory with for example 'http://' in the URL
//^Accepts it all as a string
app.get('/api/shorturl/new/:urlToShorten(*)', function(req, res){
  let urlToShorten = req.params.urlToShorten; //Param is in the URL
  
  //Check if client entered valid URL starting off with (http:// or https://)
  let expression = '^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
  let regex = new RegExp(expression);
  
  if(regex.test(urlToShorten)){   
    
    //dns.lookup only takes hostname, not full URL
    let fullURL = new URL(urlToShorten); //Not supported in IE11 or below. Edge should replace IE
    dns.lookup((fullURL.hostname),function(err){
      
      if(err){ //If the domain does not exist then it is not a valid URL
        return res.json({"error":"invalid URL"})
      }
      
      //Check database if the url has already been shortened
      //by finding at least one doc with similar original url
      //.find() returns [], while .findOne() returns null, if not found
      shortUrl.findOne({"original_url":urlToShorten}, function(err,data){
        if(err){ //Check for errors
          console.error(err);
        } 
        
        //!null is true
        if(!data){ //cannot find doc, so create and save new document to database
          let short = Math.floor(Math.random()*10000).toString(); //Create random number (0,10000)
          let doc = new shortUrl(
            {
              "original_url":fullURL.origin, //fullURL.origin is the full URL submitted by client
              "short_url": short //Random number
            }
          );
      
          doc.save(function(err){
            if(err){
              return res.send("ERROR SAVING TO DATABASE");
            }
          });
        
          //send json of the newly created document
          return res.json({
            "original_url":fullURL.origin,
            "short_URL": doc.short_url
          });
          
        } else { //Document containing that url exists, so send shortened url
          return res.json(
            {
              "original_url": data.original_url,
              "short_url": data.short_url
            }
          );
        }
      });
      
    });
  } else { //If fails regex test then it is not a valid URL
    return res.json({"error":"invalid URL"});
    }
});

//POST redirected to GET with the URL submitted in Form
app.post('/api/shorturl/new', function(req, res){
  //request.body is defined in react.jsx with name data being "original_url"
  //res.redirect('/api/shorturl/new/'+ req.body.original_url);
  
  let urlToShorten = req.body.original_url; //Body is from FORM
  
  //Check if client entered valid URL starting off with (http:// or https://)
  let expression = '^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';
  let regex = new RegExp(expression);
  
  if(regex.test(urlToShorten)){   
    
    //dns.lookup only takes hostname, not full URL
    let fullURL = new URL(urlToShorten); //Not supported in IE11 or below. Edge should replace IE
    dns.lookup((fullURL.hostname),function(err){
      
      if(err){ //If the domain does not exist then it is not a valid URL
        return res.json({"error":"invalid URL"})
      }
      
      //Check database if the url has already been shortened
      //by finding at least one doc with similar original url
      //.find() returns [], while .findOne() returns null, if not found
      shortUrl.findOne({"original_url":urlToShorten}, function(err,data){
        if(err){ //Check for errors
          console.error(err);
        } 
        
        //!null is true
        if(!data){ //cannot find doc, so create and save new document to database
          let short = Math.floor(Math.random()*10000).toString(); //Create random number (0,10000)
          let doc = new shortUrl(
            {
              "original_url":fullURL.origin, //fullURL.origin is the full URL submitted by client (https://www.somewebsite.com/more)
              "short_url": short //Random number
            }
          );
      
          doc.save(function(err){
            if(err){
              return res.send("ERROR SAVING TO DATABASE");
            }
          });
        
          //send json of the newly created document
          return res.json({
            "original_url":fullURL.origin,
            "short_URL": doc.short_url
          });
          
        } else { //Document containing that url exists, so send shortened url
          return res.json(
            {
              "original_url": data.original_url,
              "short_url": data.short_url
            }
          );
        }
      });
      
    });
  } else { //If fails regex test then it is not a valid URL
    return res.json({"error":"invalid URL"});
    }
});

app.get('/api/shorturl/:urlToFind',function(req,res){
  let shortenedURL = req.params.urlToFind;
  
  //Find at least one doc with the shorturl
  shortUrl.findOne({"short_url":shortenedURL},function(err,data){
    if(err){ //Check for error
      console.error(err);
    }
    if(!data) { //!null - not null is true
      return res.json({"error":"No short url found for given input"});
    } else { //redirect to original url found
        return res.redirect(data.original_url);
      }
  });
});


app.listen(process.env.PORT || 3000 );
