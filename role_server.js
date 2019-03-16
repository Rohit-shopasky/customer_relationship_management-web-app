module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/role",function(req,res){
	  
	  var sql="select * from users";
	  con.query(sql,function(error,all_users){
		  if(error) throw error;
		  
		  var sql="select * from page_list";
		  con.query(sql,function(error,all_pages){
			  if(error) throw error;
			    
			  var sql="select users.user_id, users.user_name, GROUP_CONCAT(concat(alc.page_id)) as page_ids from users left join alc on users.user_id=alc.user_id group by users.user_id;";
			  con.query(sql,function(error,alc){
				  if(error) throw error;
				   
				  res.render("role.ejs",{all_users:all_users,all_pages:all_pages,alc:alc}); 
			  });
		  });
	  })
  });
  
  router.get("/get_user_data",function(req,res){
	  
	  var user_id= req.query.user_id;
	  var sql="select users.user_id, users.user_name, users.email, GROUP_CONCAT(concat(alc.page_id)) as page_ids from users join alc WHERE users.user_id=alc.user_id and users.user_id=" + user_id;
	  con.query(sql,function(error,result){
		  if(error) throw error;
		  
		  var sql="select * from alc where user_id=" + user_id;
		  con.query(sql,function(error,alc){
			  if(error) throw error;
			  
			  var sql="select * from page_list";
			  con.query(sql,function(error,all_pages){
				  if(error) throw error;
				  res.json({result:result,alc:alc,all_pages:all_pages});
			  })
			  
			  
		  })
		  
		  
	  })
	  
  })
  
  router.post("/change_permission",function(req,res){
	  var page_id = req.body.page_id;
	  var user_id = req.body.user_id;
	  var user_name = req.body.user_name;
	  var email    = req.body.email;
	  var values=new Array();
	  
	  
	  for(var i=0;i<page_id.length;i++)
	  {
		  var inner = new Array();
		  inner.push(user_id,page_id[i]);
		  values.push(inner);
	  }
	  console.log(values);
	  
	  // every time first  delete before insertion
	  var sql="delete from alc where user_id=" + user_id;
	  con.query(sql,function(error,result){
		  if(error) throw error;
		     
		     if(page_id.length!=0)
			 {
		     var sql="insert into alc (user_id,page_id) values ?";
			 con.query(sql,[values],function(error,result){
				 if(error) throw error;
				 console.log(result);
			 })
			 }
			 else
			 {
				 res.send("1");
			 }
		// update username and email
         var sql="update users SET user_name='" + user_name + "', email='" + email + "' where user_id=" + user_id;
		 con.query(sql,function(error,result){
			 if(error) throw error;
			 //console.log(result);
			 res.send("1");
		 });
     		
	  })
	  
  });



  return router;
})();