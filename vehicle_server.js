module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 
 
router.get("/vehicle",function(req,res){
	
	// vehicles of all categories
	var sql="select * from vehicle_category";
	con.query(sql,function(error,vehicle_types){
		if(error) throw error;
		
		var sql="select * from cities";
		con.query(sql,function(error,cities){
           if(error) throw error;
		   console.log(cities);
		   
		   var sql="select vehicles.vehicle_type, vehicles.vehicle_number, vehicles.transporter_name, vehicles.source_city_id, vehicles.destination_city_id, vehicles.driver_name, vehicles.mobile, vehicle_category.category_name from vehicles LEFT JOIN vehicle_category ON vehicles.vehicle_type=vehicle_category.category_id";
		   con.query(sql,function(error,all_vehicles){
			   if(error) throw error;
			   console.log(all_vehicles);
			   res.render("vehicle.ejs",{vehicle_types:vehicle_types,cities:cities,all_vehicles:all_vehicles}); 
		   });		   
		});
	});
	
	 
});

router.post("/add_vehicle",function(req,res){
	var vehicle_type    = req.body.vehicle_type;
	var vehicle_number  = req.body.vehicle_number;
	var driver_name     = req.body.driver_name;
	var transporter_name= req.body.transporter_name;
	var mobile          = req.body.mobile;
	var source_city_id  = req.body.source_city;
	var destination_city_id = req.body.destination_city;
	
	vehicle_number = vehicle_number.toUpperCase();
	
	var sql="select * from vehicles WHERE vehicle_number='" +vehicle_number + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		if(result.length==0)
		{
			// insert into db
			var values={
				"vehicle_type"      : vehicle_type,
				"vehicle_number"    : vehicle_number,
				"driver_name"       : driver_name,
				"transporter_name"  : transporter_name,
				"mobile"            : mobile,
				"source_city_id"    : source_city_id,
				"destination_city_id":destination_city_id,
			};
			
			var sql="insert into vehicles SET ?";
			con.query(sql,values,function(error,result){
				if(error) throw error;
				
				res.send("1");
			});
		}
		else
		{
			// already exsist
			res.send("0");
		}
	});
	
});







  return router;
})();