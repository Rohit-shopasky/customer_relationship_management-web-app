module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 

router.get("/cities",function(req,res){
	var sql="select * from cities";
	con.query(sql,function(error,result){
		if(error) throw error;
		res.render("cities.ejs",{result:result});
	});
	
});


router.post("/add_city",function(req,res){
	var city_name = req.body.city_name;
	city_name = city_name.toUpperCase();
	var sql="select * from cities where city_name='" + city_name + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		  
		if(result.length==0)
		{
			// insert into db
			var values={
				"city_name" : city_name,
			}
			var sql="insert into cities set ?"
			con.query(sql,values,function(error,result){
				if(error) throw error;
				res.send("1");
			});
		}
		else
		{
			res.send("0");
		}
	});
});






  return router;
})();