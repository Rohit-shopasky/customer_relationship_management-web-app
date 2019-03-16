module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
router.get("/reoccuring_vehicles",function(req,res){
	var result = new Array();
	result.length=0;
	res.render("reoccuring_vehicles.ejs",{result:result,start_date:'',end_date:'',times:''});
	
});

router.get("/get_data_of_reoccuring_vehicles",function(req,res){
	var times      = req.query.times;
	var start_date = moment(req.query.start_date).format();
	var end_date   = moment(req.query.end_date).format();
	
	if(start_date=== "Invalid date" || end_date==="Invalid date")
	{
		var sql="SELECT orders.vehicle_number from orders group by orders.vehicle_number having count(*)=" + times;
		con.query(sql,function(error,result){
			if(error) throw error;
			res.render("reoccuring_vehicles.ejs",{result:result,start_date:'',end_date:'',times:times});
		});
	}
     else
	 { 
	var sql="SELECT orders.vehicle_number from orders where (orders.created_date>='" + start_date + "' and orders.created_date<= DATE('" + end_date + "') + INTERVAL 1 DAY) group by orders.vehicle_number having count(*)=" + times;
	con.query(sql,function(error,result){
		if(error) throw error;
		console.log(result);
		
		            // for filling the text inputs
				   start_date = moment(start_date).format("MMM D, YYYY");
				   end_date   = moment(end_date).format('MMM D, YYYY');
		
		res.render("reoccuring_vehicles.ejs",{result:result,start_date:start_date,end_date:end_date,times:times});
	});
   }
});


router.get("/get_orders_from_vehicle_no",function(req,res){
	var vehicle_number = req.query.vehicle_no;
	
	var sql="select * from orders where vehicle_number='" + vehicle_number + "'";
	con.query(sql,function(error,all_orders){
		if(error) throw error;
		res.send(all_orders);
	});
})






  return router;
})();