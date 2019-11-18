require('dotenv').config()
var http = require("http");
var generate_token = require('./scripts/token_generator');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
const cors = require('cors')({origin: true});
var formidable = require('formidable');
var host = "0.0.0.0"
var port = process.env.PORT || 30001
require('dotenv').config();
const path = require('path')
var ipfilter = require('express-ipfilter').IpFilter;

var IpDeniedError = require('express-ipfilter').IpDeniedError;

// whitelist the following IPs
var ips = process.env.whitelisted_ips.split(',');
app.use(ipfilter(ips, {mode: 'allow'}));
app.use(cors);
app.use(express.json())
// if (process.env.env === 'development'){
//   app.use(function(err, req, res, _next) {
//     console.log(err)
//     console.log(req.query)
//     if(err instanceof IpDeniedError){
//       res.status(401);
//       res.send("<body><p>Create .env file at root and add whitelisted_ips=[127.0.0.1]</p></body>");
//     }else{
//       res.status(err.status || 500);
//       res.send("<body><p>CRASHED</p></body>");
//     }
//   });
// }else{
//   app.use(function(err, req, res, _next) {
//     res.status(401).send("<body><p> Contact Administrator </p></body>");
//   });
// }


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/fe-app/dist/fe-app'));


// Running Server Details.
var server = app.listen(port, host, function() {
  var host = server.address(host).address
  var port = server.address(port).port
  console.log("App listening at %s:%s Port", host, port)
});
app.get('/generate_jwt', function(req, res) {
  res.sendFile(path.join(__dirname, './fe-app/dist/fe-app/index.html'));
});

app.get('/generate', function(req, res) {
  var html = '';
  html += "<body>";
  html += "<form action='/generate'  method='post' name='form1'>";
  html += "Key:</p><input type= 'text' name='cipher_key' required><br/>";
  html += "Env:</p><input type= 'text' name='env' required><br/>";
  html += "Uan:</p><input type= 'text' name='uan'><br/>";
  html += "Application date:</p><input type= 'date' name='application_date' required><br/>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

// app.use('/generate', ipfilter(ips, {mode: 'allow'}), (req, res) => {
// });
// app.use(function(err, req, res, _next) {
//   // console.log(res);
//   // console.log(err);
//   if (req.query.env == "production"){
//     console.log("tries to respond");
//     res.status(401).send("<body><p> Contact Administrator </p></body>");
//   };
// });

app.post('/generate', urlencodedParser, function(req, res) {

  const data = {env: req.body.env, cipher_key: req.body.cipher_key, uan: req.body.uan, application_date: req.body.application_date};

  var token = generate_token(data);

  var html = '';
  var lambda_url = ""
  html += "<body><p>";
  html += "</p>";

  if(req.body.env == "development") {
    lambda_url = "https://ot8gfcuxt3.execute-api.eu-west-2.amazonaws.com/"
  } else if(req.body.env == "staging") {
    lambda_url = "https://csdrsqgzxe.execute-api.eu-west-2.amazonaws.com/"
  } else if(req.body.env == "production") {
    lambda_url = "https://njcjmfjulf.execute-api.eu-west-2.amazonaws.com/"
  }

  html += '<form class="jwt-form" action="' + lambda_url + req.body.env + '/jwt" method="post">'
  html += '<div><label for="Click the button"></label><input type="hidden" id="jwt" name="visa_token" value="' + token + '"/></div>'
  html += '<input type="submit" value="ENTER"></form>'
  html += "<br/></body>";

  res.send(html);
});
app.post('/generatejwt', function(req, res) {

  var token = generate_token(req.body);
  var html = '';
  var lambda_url = ""
  html += "<body><p>";
  html += "</p>";

  if(req.body.env == "development") {
    lambda_url = "https://ot8gfcuxt3.execute-api.eu-west-2.amazonaws.com/"
  } else if(req.body.env == "staging") {
    lambda_url = "https://csdrsqgzxe.execute-api.eu-west-2.amazonaws.com/"
  } else if(req.body.env == "production") {
    lambda_url = "https://njcjmfjulf.execute-api.eu-west-2.amazonaws.com/"
  }

  html += '<form class="jwt-form" action="' + lambda_url + req.body.env + '/jwt" method="post">'
  html += '<div><label for="Click the button"></label><input type="hidden" id="jwt" name="visa_token" value="' + token + '"/></div>'
  html += '<input type="submit" class="btn btn-lg btn-outline-primary" value="Send me to the journey"></form>'
  html += "<br/></body>";
  res.send(html);
});
