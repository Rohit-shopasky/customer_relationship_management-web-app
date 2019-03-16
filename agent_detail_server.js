module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
 
router.get("/get_agent_detail",function(req,res){
	
	var agent_code  = req.query.agent_code;
	var agent_name  = req.query.agent_name;
	
    var sql="select COUNT(*) AS total_visits from orders where agent_code='" +agent_code + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		//console.log(result);
		// get agent detail 
		var sql="select * from agents where agent_code='" + agent_code + "'";
		con.query(sql,function(error,agent_detail){
			if(error) throw error;
			
			res.render("agent_detail.ejs",{result:result,agent_detail:agent_detail});
		})	
	})
})

router.get("/get_filtered_agent_visits_from_date",function(req,res){
	
	var start_date     = moment(req.query.start_date).format();
	var end_date       = moment(req.query.end_date).format();
	var agent_code     = req.query.agent_code;
	
	var sql="select COUNT(*) AS total_visits from orders where agent_code='" + agent_code + "' and (orders.created_date>='" + start_date + "' and                  orders.created_date<= Date('" + end_date + "') + INTERVAL 1 DAY)";
	
	con.query(sql,function(error,orders_count){
		if(error) throw error;
		
			var sql="select orders.created_date,Count(*) AS total_orders from orders  where agent_code='" + agent_code + "' and (orders.created_date>='" + start_date + "' and orders.created_date<= Date('" + end_date + "') + INTERVAL 1 DAY) GROUP BY CAST(orders.created_date AS DATE) order by orders.created_date DESC";
			
			con.query(sql,function(error,order_details){
				if(error) throw error;
				res.json({orders_count:orders_count,order_details:order_details});
			})
		
		      
	}) 
	
});

router.get("/show_detail_orders_of_agents",function(req,res){
	var created_date = moment(req.query.created_date).format("YYYY-MM-DD");
	var agent_code   = req.query.agent_code;
	console.log(created_date);
	
	var sql="select * from orders where agent_code='" + agent_code + "' and Date(orders.created_date)='" + created_date + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		res.send(result)
	})
})



  return router;
})();