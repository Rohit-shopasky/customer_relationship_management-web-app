module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/recurring_agent_visits",function(req,res){
	  
	  var sql="SELECT agents.name, agents.agent_code, count(orders.order_id) as orders from agents left join orders on agents.agent_code = orders.agent_code GROUP by agents.name";
	  
	  con.query(sql,function(error,result){
		  if(error) throw error;
		  res.render("recurring_agent_visits.ejs",{result:result,start_date:'',end_date:''}); 
	  });
  });
  
  
  router.get("/show_filtered_recurring_agent_visits",function(req,res){
     var start_date = req.query.start_date;
	 var end_date   = req.query.end_date;
	 
	start_date     = moment(start_date).format();
	end_date       = moment(end_date).format();
	  
	 var sql = "SELECT agents.name, agents.agent_code, count(orders.order_id) as orders from agents left join orders on agents.agent_code = orders.agent_code and(orders.created_date>='" + start_date + "' and        orders.created_date<= Date('" + end_date + "') + INTERVAL 1 DAY ) GROUP by agents.name order by Count(orders.order_id) DESC";
	 
	 con.query(sql,function(error,result){
		 if(error) throw error;
		 
		 // filling inputs
		 start_date = moment(start_date).format("MMM D, YYYY");
		 end_date   = moment(end_date).format('MMM D, YYYY');
		 
		 res.render("recurring_agent_visits.ejs",{result:result,start_date:start_date,end_date:end_date});
	 });
 	  
  });

  
  router.get("/get_orders_from_agentcode",function(req,res){
	  
	  var agent_code = req.query.agent_code;
	  var sql = "select * from orders where agent_code='" + agent_code + "'";
	  con.query(sql,function(error,all_orders){
		  if(error) throw error;
		  res.send(all_orders);
	  });
  });
  
  
  



  return router;
})();