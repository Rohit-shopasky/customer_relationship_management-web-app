module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/agent_history",function(req,res){
	  
	  
	  
	  var agent_code = req.query.agent_code;
	  var start_date = req.query.start_date;
	  var end_date   = req.query.end_date;
	  if(agent_code===undefined || agent_code=="" || start_date===undefined || end_date===undefined)
	  {
		  
	  var result  = new Array();
	  
	  
	  
	  res.render("agent_history.ejs",{result:result,opening:0,closing:0,start_date:'',end_date:'',agent_code:0});
	  }
	  else if(start_date && end_date)
	  {
		  console.log(start_date);
		  start_date     = moment(start_date).format();
	      end_date       = moment(end_date).format();
		  
		  
		 var sql="select commision.created_date, SUM(commision.commision) AS commision from commision where agent_code='" + agent_code + "' AND ( created_date BETWEEN Date('" + start_date + "') AND Date('" + end_date + "') + INTERVAL 1 DAY ) group by CAST(created_date AS DATE)";
 
         con.query(sql,function(error,result){
			 if(error) throw error;
			 
			 //calculating opening balance
			 
		   var sql="select SUM(commision) AS opening from commision where created_date<='" + start_date + "' and agent_code='" + agent_code + "' ";
		   
		   con.query(sql,function(error,opening_balance){
			   if(error) throw error;
			   
			   
			   // calculate closing balance
			   
			   var sql="select SUM(commision) AS closing from commision where created_date<= DATE('" + end_date + "' + INTERVAL 1 DAY) and agent_code='" + agent_code + "' "
			   
			   con.query(sql,function(error,closing_balance){
				   
				   if(error) throw error;
				   
				   if(closing_balance[0].closing===null){closing_balance[0].closing=0}
				   if(opening_balance[0].opening===null){opening_balance[0].opening=0}
				   
				   // for filling the text inputs
				   start_date = moment(start_date).format("MMM D, YYYY");
				   end_date   = moment(end_date).format('MMM D, YYYY');
				   
				   res.render("agent_history.ejs",{result:result,opening:opening_balance,closing:closing_balance,start_date:start_date,end_date:end_date,agent_code:agent_code});
			   })  
		   })
		 })
         		 
	  }
	  else
	  {
		  
		 var sql="select commision.created_date, SUM(commision.commision) AS commision from commision where agent_code='" + agent_code + "' group by CAST(created_date AS DATE)";
		 con.query(sql,(error,result)=>{
			 if(error) throw error;
			 
			 
			 // calculate closing balance
			   
			   var sql="select SUM(commision) AS closing from commision where agent_code='" + agent_code + "' "
			   
			   con.query(sql,function(error,closing_balance){
				   if(error) throw error;
				   if(closing_balance[0].closing===null){closing_balance[0].closing=0}
				   
				   res.render("agent_history.ejs",{result:result,opening:0,closing:closing_balance,start_date:'',end_date:'',agent_code:agent_code});  
			   })
		 })
	  }
  });
  
  



  return router;
})();