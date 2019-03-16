module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/price",function(req,res){
	  
	  var sql="select price_per_kg from price";
	  con.query(sql,function(error,result){
		  if(error) throw error;
		  
		  var price = 0;
		  if(result.length==0)
		  {
			  
			  price = 0;
		  }
		  else
		  {
			  price = result[0].price_per_kg;
		  }
		  res.render("price.ejs",{price:price});
	  });
  });
  
  
  router.post("/change_price",function(req,res){
	  var price = req.body.price;
	 
	  // check if table is empty
	  var sql="select * from price";
	  con.query(sql,function(error,result){
		  if(error) throw error;
		  if(result.length==0)
		  {
			  // insert
			  var values = {
				  price_per_kg : price,
			  }
			  var sql="insert into price set ?";
			  con.query(sql,values,function(error,result){
				  if(error) throw error;
				  res.send("1");
			  })
		  }
		  else
		  {
			  // update 
			  var sql="update price SET price_per_kg=" +price;
	            con.query(sql,function(error,result){
		        if(error) throw error;
		        res.send("1");
	            });
		  }
	  });
	  
	  
  });
  
  



  return router;
})();