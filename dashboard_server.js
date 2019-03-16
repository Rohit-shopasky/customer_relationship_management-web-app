module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/dashboard",function(req,res){
	  
	  res.render("dashboard.ejs",{});
  });
  
  
  router.get("/get_all_orders_this_month",function(req,res){
	  
	  var date = moment().format("YYYY-MM-DD hh:mm:ss");
	 
	  var sql="select COUNT(*) as orders,created_date from orders where MONTH(created_date)=MONTH('" + date + "') group by CAST(created_date AS DATE)";
	  con.query(sql,function(error,result){
		  if(error) throw error;
		  res.send(result);
	  })
	  
  });
  
  



  return router;
})();