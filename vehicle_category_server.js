module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 

router.get("/vehicle_category",function(req,res){
	
	var sql="select * from vehicle_category";
	con.query(sql,function(error,result){
		res.render("vehicle_category.ejs",{result:result});
	});
    
	
});


router.post("/add_category",function(req,res){
	var category_name = req.body.category_name;
	category_name = category_name.toUpperCase();
	var sql="select * from vehicle_category where category_name='" + category_name + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		  
		if(result.length==0)
		{
			// insert into db
			var values={
				"category_name" : category_name,
			}
			var sql="insert into vehicle_category set ?"
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