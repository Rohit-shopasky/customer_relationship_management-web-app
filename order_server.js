module.exports=(function(){
	var router = require('express').Router();
	var ejs    = require("ejs");
	var mysql  = require('mysql');
    var moment = require('moment');
    var con = require('./config/config.js');
 
 

router.get("/order",function(req,res){
	
	var sql="select * from vehicle_category";
	con.query(sql,function(error,vehicle_types){
		if(error) throw error;
		
		var sql="select *  from cities";
		con.query(sql,function(error,cities){
			if(error) throw error;
			
           var sql="select orders.order_id, orders.qty_purchased, orders.price, orders.discount,agents.name, orders.vehicle_number,orders.total_amount,orders.net_amount, orders.created_date FROM orders LEFT JOIN agents ON orders.agent_code=agents.agent_code ORDER BY orders.order_id DESC";
		   
		   con.query(sql,function(error,result){
			   if(error) throw error;
			   res.render("order.ejs",{result:result,start_date:'',end_date:''});
		   });
			
			
		})  
	});
});

router.get("/show_filtered_orders",function(req,res){
	var start_date = req.query.start_date;
	 var end_date   = req.query.end_date;
	 
	 start_date     = moment(start_date).format();
	 end_date       = moment(end_date).format();
	 
    var sql="select orders.order_id, orders.qty_purchased, orders.price, orders.discount,agents.name, orders.vehicle_number,orders.total_amount,orders.net_amount, orders.created_date FROM orders LEFT JOIN agents ON orders.agent_code=agents.agent_code and (orders.created_date>='" + start_date + "' and                  orders.created_date<= Date('" + end_date + "') + INTERVAL 1 DAY) ORDER BY orders.order_id DESC";
	
	con.query(sql,function(error,result){
		if(error) throw error;
		
		// filling text inputs
		start_date = moment(start_date).format("MMM D, YYYY");
		end_date   = moment(end_date).format('MMM D, YYYY');
		
	     res.render("order.ejs",{result:result,start_date:start_date,end_date:end_date});
	}); 
	
});


router.get("/place_order",function(req,res){
	
	var sql="select * from vehicle_category";
	con.query(sql,function(error,vehicle_types){
		if(error) throw error;
		
		var sql="select *  from cities";
		con.query(sql,function(error,cities){
			if(error) throw error;
			
           var sql="select orders.order_id, orders.qty_purchased, orders.price, orders.discount,agents.name, orders.vehicle_number FROM orders JOIN agents WHERE orders.agent_code=agents.agent_code ORDER BY orders.order_id DESC";
		   
		   con.query(sql,function(error,result){
			   if(error) throw error;
			   
			   var sql="select price_per_kg from price";
			   con.query(sql,function(error,price_result){
				   if(error) throw error;
				  
				    var price = 0;
                   if(price_result.length==0)
				   {
					   price = 0;
				   }
                   else
				   {
					   price = price_result[0].price_per_kg;
				   }					   
				   
				   
				   res.render("place_order.ejs",{vehicle_types:vehicle_types,cities:cities,result:result,price:price}); 
			   });
		   });
			
			
		})  
	});
	
	
});

router.get("/get_vehicles",function(req,res){
	var vehicle_number = req.query.vehicle_number;
	vehicle_number=vehicle_number.toLowerCase();
	var sql="select vehicles.driver_name, (select cities.city_name from cities JOIN vehicles WHERE vehicles.source_city_id=cities.id AND vehicles.vehicle_number='" + vehicle_number + "') AS source, (select cities.city_name from cities JOIN vehicles WHERE vehicles.destination_city_id=cities.id AND vehicles.vehicle_number='" + vehicle_number + "') AS destination, vehicles.driver_name, vehicles.transporter_name, vehicles.mobile,vehicles.source_city_id,vehicles.destination_city_id, vehicle_category.category_id,vehicle_category.category_name, (select count(order_id) from orders where vehicle_number='" +vehicle_number + "' ) as total_orders_of_vehicle from vehicles JOIN vehicle_category WHERE vehicles.vehicle_type=vehicle_category.category_id AND vehicles.vehicle_number='" + vehicle_number + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		//console.log(result);
		res.send(result);
	});
});


router.post("/add_order",function(req,res){
	var vehicle_type    = req.body.vehicle_type;
	var vehicle_number  = req.body.vehicle_number;
	var driver_name     = req.body.driver_name;
	var transporter_name= req.body.transporter_name;
	var mobile          = req.body.mobile;
	var source_city_id  = req.body.source_city;
	var destination_city_id = req.body.destination_city;
    var agent_code      = req.body.agent_code;
	var qty_purchased   = req.body.qty_purchased;
	var price           = req.body.price;
	var discount        = req.body.discount;
	var total_amount    = req.body.total_amount;
	var net_amount      = req.body.net_amount;
	var agent_commision = req.body.agent_commision;
	
	// check if vehicle no exsists
	   vehicle_number = vehicle_number.toUpperCase();
	  
	   var sql="select agent_code from agents WHERE agent_code='" + agent_code + "'";
	   con.query(sql,function(error,agents){
		   if(error) throw error;
		    if(agent_code=="" || (agents.length>0))
			{
				var sql="select vehicle_number from vehicles WHERE vehicle_number='" + vehicle_number + "'";
	            con.query(sql,function(error,result){
		        if(error) throw error;
		    
			    if(result.length==0)
                  {
				     // new vehicle add vehicle as well as order details
					 console.log("new vehicle");
					 add_vehicle(res,vehicle_type,vehicle_number,driver_name,transporter_name,mobile,source_city_id,destination_city_id);
					 
					 add_order_details(agent_code,qty_purchased,price,discount,vehicle_number,total_amount,net_amount);
					 add_commision(agent_code,agent_commision);
					 res.send("1");
			      }
			    else
			     {
				   // already exsisted vehicle add only order details
				   console.log("vehicle exsits");
				   add_order_details(agent_code,qty_purchased,price,discount,vehicle_number,total_amount,net_amount);
				   add_commision(agent_code,agent_commision);
				   res.send("1");
                 }
		     
	            });
			}
			else
			{
				// agent does not exsist
				console.log("Agent not exsist");
				res.send("0");
				
			}
	   });
	   
});

router.get("/get_agent_data",function(req,res){
	var agent_code = req.query.agent_code;
	var sql="select agent_discount,commision from agents where agent_code='" +agent_code + "'";
	con.query(sql,function(error,result){
		if(error) throw error;
		console.log(result);
		res.send(result);
	})
});


function add_vehicle(res,vehicle_type,vehicle_number,driver_name,transporter_name,mobile,source_city_id,destination_city_id)
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
				console.log(result);
			});
}

function add_order_details(agent_code,qty_purchased,price,discount,vehicle_number,total_amount,net_amount)
{
	var sql="insert into orders SET ?";
	var values = {
		           agent_code   : agent_code,
				   qty_purchased: qty_purchased,
				   price        : price,
				   discount     : discount,
				   vehicle_number: vehicle_number,
				   total_amount : total_amount,
				   net_amount   : net_amount,
	}
	con.query(sql,values,function(error,result){
		if(error) throw error;
		
	});
}

function add_commision(agent_code,commision)
{
	console.log(agent_code + " " + commision);
	var sql="insert into commision set ?";
	var values={
		agent_code : agent_code,
		commision  : commision,
		withdrawl  : 0,
	}
	con.query(sql,values,function(error,result){
		if(error) throw error;
	
	});
}










  return router;
})();