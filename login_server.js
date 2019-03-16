module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
 
router.get("/",function(req,res){
	 res.render("index.ejs",{});
});

router.post("/login",function(req,res){
	var user_name = req.body.user_name;
	var password  = req.body.password;
	
	var sql="Select * FROM users WHERE user_name='" +user_name + "' AND password='" +password + "'; ";
	con.query(sql,function(error,result){
		if(error) throw error;
		if(result.length!=0)
		{
		    if(error) throw error;
			  
			  var user_id = result[0].user_id;
			  var sql="select alc.page_id , page_list.page_path from alc join page_list WHERE alc.page_id=page_list.page_id AND alc.user_id=" +user_id;
			  
			  con.query(sql,function(error,page_path){
				  if(error) throw error;
				  
				  var paths = new Array();
				  for(var i=0;i<page_path.length;i++)
				  {
					  paths.push(page_path[i].page_path)
				  }
				  
				  res.json({"status":"ok","user_id":result[0].user_id,page_path:paths,admin_control:result[0].admin_control,user_name:result[0].user_name});
			  })
			
			console.log("okay login");
		}
		else
		{
			res.send("error");
			console.log("Incorrect password");
		}
	});	
	
});

  return router;
})();