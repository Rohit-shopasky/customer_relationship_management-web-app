module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
  router.get("/report",function(req,res){
	  
	  res.render("report.ejs",{});
  });
  
  
   router.get("/search_transporter",function(req,res){
	   var t_name = req.query.transporter_name;
	   t_name = "%" + t_name + "%";
	   
	   
	   var sql="Select vehicles.transporter_name, vehicles.vehicle_number from vehicles where vehicles.transporter_name LIKE '" + t_name + "' GROUP BY vehicles.transporter_name";
	   ;
	   
	   con.query(sql,function(error,result){
		   if(error) throw error;
		   
		   res.send(result);
	   });
   });
   
   
   router.get("/get_orders_by_transporter_name",function(req,res){
	   var transporter_name = req.query.transporter_name;
	   var start_date       = req.query.start_date;
	   var end_date         = req.query.end_date;
	   
	   start_date     = moment(start_date).format();
	   end_date       = moment(end_date).format();
	   
	   var sql="select vehicle_number from vehicles WHERE transporter_name='" + transporter_name + "'";
	   con.query(sql,function(error,all_vehicles){
		   if(error) throw error;
		    // console.log(all_vehicles);
		  var all_vehicle_numbers = new Array();
		   
		   for(var i=0;i<all_vehicles.length;i++)
		   {
			   all_vehicle_numbers.push(all_vehicles[i].vehicle_number);
		   }
		   
		  if(req.query.start_date!="" && req.query.end_date!="")
		  {
		  var sql="select * from orders where  vehicle_number IN (?) and (orders.created_date>='" + start_date + "' and        orders.created_date<= Date('" + end_date + "') + INTERVAL 1 DAY )";
		  }
		  else
		  {
			var sql="select * from orders where  vehicle_number IN (?)";  
		  }
          con.query(sql,all_vehicle_numbers,function(error,orders){
			  if(error) throw error;
			  console.log(orders);
			  res.send(orders);
		  })		  
		 
	   }); 
	   
	   
	   
	   
   });


  return router;
})();