var express       =  require("express");
var app           =  express();
var bodyParser    = require('body-parser');
var ejs           = require("ejs");
var cors          = require("cors");   // for cross origin
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use("/photos",express.static("photos"));   // profile pics
app.use("/photo_ids",express.static("photo_ids"));   // photo ids


app.use("/views",express.static("views")); // style sheets and css
app.use("/views/js",express.static("js")); // style sheets and css
app.use("/views/icons",express.static("icons")); // icons
app.use("/config",express.static("config"));



var login_server = require("./login_server.js");
app.use("/",login_server);

var agent_server = require("./agent_server.js");
app.use("/",agent_server);

var vehicle = require("./vehicle_server.js");
app.use("/",vehicle);

var order = require("./order_server.js");
app.use("/",order);

var city = require("./city_server.js");
app.use("/",city);

var vehicle_category = require("./vehicle_category_server.js");
app.use("/",vehicle_category);

var role = require("./role_server.js");
app.use("/",role);

var dashboard = require("./dashboard_server.js");
app.use("/",dashboard);

var price = require("./price_server.js");
app.use("/",price);

var report = require("./report_server.js");
app.use("/",report);

var recurring = require("./recurring_server.js");
app.use("/",recurring);

var reoccuring_vehicles = require("./reoccuring_vehicles_server.js");
app.use("/",reoccuring_vehicles);

var agent_history = require("./agent_history_server.js");
app.use("/",agent_history);

var recurring_agent_server = require("./recurring_agent_server.js");
app.use("/",recurring_agent_server);

var agent_detail_server = require("./agent_detail_server.js");
app.use("/",agent_detail_server);

app.listen(3000);
console.log("Server started on 3000");