module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
 
router.get("/agent",function(req,res){
	
	var sql="select * from agents";
	con.query(sql,function(error,result){
		res.render("agent.ejs",{result:result});
	});
	
	
});


router.post("/add_agent",function(req,res){
	
	var name               = req.body.agent_name;
	var mobile             = req.body.mobile;
	var address            = req.body.address;
	var agent_code         = req.body.agent_code;
	var photo              = req.body.profile_photo_path;
	var agent_photo_id     = req.body.photo_id_path;
	var agent_discount     = req.body.agent_discount;
	var agent_commision    = req.body.agent_commision;

	// search if this mobile no exsist
	var sql = "select * from agents WHERE mobile=" +mobile;
	con.query(sql,function(error,result){
		console.log(result.length);
		if(result.length==0)
		{
			
			// new agent insert
			// insert into db
	         var sql="insert into agents SET ?";
	          var values={
		                  "name"          :name,
		                  "mobile"        :mobile,
		                  "address"       :address,
		                  "agent_code"    :agent_code,
		                  "photo"         :photo,
		                  "agent_photo_id":agent_photo_id,
						  "agent_discount":agent_discount,
						  "commision"     :agent_commision,
	                      }
	
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


var fileUpload = require('express-fileupload');
var path=require('path');
// default options
router.use(fileUpload({
    limits: { fileSize: 1024*1024*5},
}));
router.post("/upload_profile_pic",function(req,res){
	
	var sampleFile = req.files.profile_photo;
	//console.log(req.files.sampleFile);
	  var extname=path.extname(sampleFile.name);
	
	if(sampleFile.name=="")
	{
	  res.send("Empty");
	}
	
	else if(extname!==".jpg" && extname!==".JPG" && extname!==".PNG" && extname!==".png" && extname!==".GIF" && extname!==".gif")
	{
	   res.send("-1");
	}
	else
	{
	  var fs=require("fs");
	   var num=Math.random();
	   num=num*100;
	   var fpath="./photos/"  + num + ".jpg";
	   sampleFile.mv(fpath, function(err) {
        if (err) {
            res.status(500).send(err);
			console.log(err);
			console.log("nahi hui upload");
        }
        else {
		      
		var	send_fpath="http://localhost:3000/photos/" + num + ".jpg";
			 console.log("upload ho gai");
			 
            res.send(send_fpath);
        }
	  });
	}
	
});

router.post("/e_upload_profile_pic",function(req,res){
	
	var sampleFile = req.files.e_profile_photo;
	//console.log(req.files.sampleFile);
	  var extname=path.extname(sampleFile.name);
	
	if(sampleFile.name=="")
	{
	  res.send("Empty");
	}
	
	else if(extname!==".jpg" && extname!==".JPG" && extname!==".PNG" && extname!==".png" && extname!==".GIF" && extname!==".gif")
	{
	   res.send("-1");
	}
	else
	{
	  var fs=require("fs");
	   var num=Math.random();
	   num=num*100;
	   var fpath="./photos/"  + num + ".jpg";
	   sampleFile.mv(fpath, function(err) {
        if (err) {
            res.status(500).send(err);
			console.log(err);
			console.log("nahi hui upload");
        }
        else {
		      
		var	send_fpath="http://localhost:3000/photos/" + num + ".jpg";
			 console.log("upload ho gai");
			 
            res.send(send_fpath);
        }
	  });
	}
	
});


router.post("/upload_photo_id",function(req,res){
	
	var sampleFile = req.files.agent_photo_id;
	//console.log(req.files.sampleFile);
	  var extname=path.extname(sampleFile.name);
	
	if(sampleFile.name=="")
	{
	  res.send("Empty");
	}
	
	else if(extname!==".jpg" && extname!==".JPG" && extname!==".PNG" && extname!==".png" && extname!==".GIF" && extname!==".gif")
	{
	   res.send("-1");
	}
	else
	{
	  var fs=require("fs");
	   var num=Math.random();
	   num=num*100;
	   var fpath="./photo_ids/"  + num + ".jpg";
	   sampleFile.mv(fpath, function(err) {
        if (err) {
            res.status(500).send(err);
			console.log(err);
			console.log("nahi hui upload");
        }
        else {
		      
		var	send_fpath="http://localhost:3000/photo_ids/" + num + ".jpg";
			 console.log("upload ho gai");
			 
            res.send(send_fpath);
        }
	  });
	}
	
});


router.post("/e_upload_photo_id",function(req,res){
	
	var sampleFile = req.files.e_agent_photo_id;
	//console.log(req.files.sampleFile);
	  var extname=path.extname(sampleFile.name);
	
	if(sampleFile.name=="")
	{
	  res.send("Empty");
	}
	
	else if(extname!==".jpg" && extname!==".JPG" && extname!==".PNG" && extname!==".png" && extname!==".GIF" && extname!==".gif")
	{
	   res.send("-1");
	}
	else
	{
	  var fs=require("fs");
	   var num=Math.random();
	   num=num*100;
	   var fpath="./photo_ids/"  + num + ".jpg";
	   sampleFile.mv(fpath, function(err) {
        if (err) {
            res.status(500).send(err);
			console.log(err);
			console.log("nahi hui upload");
        }
        else {
		      
		var	send_fpath="http://localhost:3000/photo_ids/" + num + ".jpg";
			 console.log("upload ho gai");
			 
            res.send(send_fpath);
        }
	  });
	}
	
});

router.get("/get_agent_data_for_edit",function(req,res){
	var agent_id = req.query.agent_id;
	console.log(agent_id);
	var sql="select * from agents WHERE agent_id=" +agent_id;
	con.query(sql,function(error,result){
		if(error) throw error;
		//console.log(result);
		res.send(result);
	});
	
});

router.post("/save_agent_edits",function(req,res){
	var agent_id              = req.body.agent_id;
	var agent_name            = req.body.agent_name;
	var mobile                = req.body.mobile;
	var address               = req.body.address;
	var agent_code            = req.body.agent_code;
	var photo                 = req.body.profile_photo_path;
	var agent_photo_id        = req.body.photo_id_path;
	var agent_discount        = req.body.agent_discount;
	var agent_commision       = req.body.agent_commision;
	
	if(photo!="")
	{
	var sql="update agents SET name='" + agent_name + "', mobile=" + mobile + ", address='" + address + "',agent_code='" + agent_code + "',photo='" + photo + "', agent_discount = " +agent_discount + ",commision=" + agent_commision + " WHERE agent_id=" + agent_id;
	}
	else if(agent_photo_id!="")
	{
		var sql="update agents SET name='" + agent_name + "', mobile=" + mobile + ", address='" + address + "',agent_code='" + agent_code + "',agent_photo_id='" + agent_photo_id + "', agent_code = " +agent_code + ", commision=" + agent_commision + " WHERE agent_id=" + agent_id;
	}
	else
	{
			var sql="update agents SET name='" + agent_name + "', mobile=" + mobile + ", address='" + address + "',agent_code='" + agent_code + "', agent_discount=" +agent_discount + ", commision=" + agent_commision + "	WHERE agent_id=" + agent_id;

	}
	
	con.query(sql,function(error,result){
		if(error) throw error;
		//console.log(result);
		res.send("1");
	});
	
});

router.post("/delete_agent",function(req,res){
	var agent_id = req.body.agent_id;
	var sql="delete from agents WHERE agent_id=" +agent_id;
	con.query(sql,function(error,result){
		if(error) throw error;
		res.send("1");
	});
});




  return router;
})();