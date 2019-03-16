module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/recurring",function(req,res){
	  
	  var sql="SELECT vehicles.transporter_name, count(orders.order_id) as orders from vehicles left join orders on vehicles.vehicle_number = orders.vehicle_number GROUP by vehicles.transporter_name Order by Count(orders.order_id) DESC";
	  
	  con.query(sql,function(error,result){
		  if(error) throw error;
		  res.render("recurring.ejs",{result:result,start_date:'',end_date:''}); 
	  });
  });
  
  
  router.get("/show_filtered_recurring",function(req,res){
     var start_date = req.query.start_date;
	 var end_date   = req.query.end_date;
	 
	start_date     = moment(start_date).format();
	end_date       = moment(end_date).format();
	  
	 var sql = "SELECT vehicles.transporter_name, count(orders.order_id) as orders from vehicles left join orders on vehicles.vehicle_number = orders.vehicle_number and(orders.created_date>='" + start_date + "' and        orders.created_date<= Date('" + end_date + "') + INTERVAL 1 DAY ) GROUP by vehicles.transporter_name order by Count(orders.order_id) DESC";
	 
	 con.query(sql,function(error,result){
		 if(error) throw error;
		 
		 // filling inputs
		 start_date = moment(start_date).format("MMM D, YYYY");
		 end_date   = moment(end_date).format('MMM D, YYYY');
		 
		 res.render("recurring.ejs",{result:result,start_date:start_date,end_date:end_date});
	 });
 	  
  });
  
  router.get("/get_orders_from_transporter_name",function(req,res){
	  
	  var transporter_name = req.query.transporter_name;
	  var sql="select * from orders WHERE vehicle_number IN ( SELECT vehicle_number from vehicles where transporter_name='" + transporter_name + "')"
	  
	  con.query(sql,function(error,all_orders){
		  if(error) throw error;
		  res.send(all_orders);
	  })
	  
  });
  
  
  
  



  return router;
})();