
var agent_commision = 0;
$(document).ready(function(){
  function showToast(message, duration){
         Materialize.toast(message, duration);
      }

function getCook(cookiename) 
  {
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }
	  
user_id=getCook("user_id");
document.getElementById('user_name').innerHTML= getCook("user_name").toUpperCase();
if(user_id=="" || user_id===undefined)
{
  alert("You need to login first!");
  window.location.assign("/");
}


$('#open_modal').leanModal();
$('.edit_link').leanModal();
$('.open_view_id').leanModal();
 //$('#preview').modal();
 
$('#know_agent_code').click(function(){
	var know_agent_code       = $('#know_agent_code').is(":checked");
	if(know_agent_code==false)
	{
		$('#agent_code').val("");
	}
})

$('#temp_save').click(function(){
	
	var vehicle_type          = $('#vehicle_type').find('option:selected').attr("name");
	var vehicle_number        = $('#vehicle_number').val();
	var driver_name           = $('#driver_name').val();
	var transporter_name      = $('#transporter_name').val();
	var mobile                = $('#mobile').val();
	var source_city           = $('#source_city').find('option:selected').attr("name");
	var destination_city      = $('#destination_city').find('option:selected').attr("name");
	var agent_code            = $('#agent_code').val();
	var qty_purchased         = $('#qty_purchased').val();
	var price                 = $('#price').val();
	var discount              = document.getElementById('discount').innerHTML;
	var net_amount            = document.getElementById('net_amount').innerHTML;
	var know_agent_code       = $('#know_agent_code').is(":checked");
	
	
	vehicle_number = vehicle_number.toUpperCase();
	vehicle_number = vehicle_number.replace(/\s/g, "");
    
	var data={vehicle_type:vehicle_type,vehicle_number:vehicle_number,driver_name:driver_name,transporter_name:transporter_name,mobile:mobile,source_city:source_city,destination_city:destination_city,agent_code:agent_code,qty_purchased:qty_purchased,price:price,discount:discount,net_amount:net_amount};
	
	if(vehicle_type!="-1" && vehicle_number!="" && driver_name!="" && transporter_name!="" && mobile!="" && source_city!="" && destination_city!="")
	{
	  if(know_agent_code==true && agent_code=="")
	  {
		  alert("error");
	  }
	  else
	  {
      $('#preview').openModal();
	  // generate preview
	  data=JSON.stringify(data);
	  generate_preview(data);
	  }
	    
	}
	else
	{
		showToast("All fields marked * must be filled!",5000);
		//$('#modal1').modal('open');
	}
	
	
});

var onCloseModal = function(){
	alert("Order completed successfully");
	window.location.assign("/order");
}

var agentErr = function(){
	alert("Agent code does not exsist! Order cannot be completed!");
}

$('#form_save').click(function(){
	
	var vehicle_type          = document.getElementById('vehicle_type').value;
	var vehicle_number        = $('#vehicle_number').val();
	var driver_name           = $('#driver_name').val();
	var transporter_name      = $('#transporter_name').val();
	var mobile                = $('#mobile').val();
	var source_city           = $('#source_city').val();
	var destination_city      = $('#destination_city').val();
	var agent_code            = $('#agent_code').val();
	var qty_purchased         = $('#qty_purchased').val();
	var price                 = document.getElementById('price').innerHTML;
	var discount              = document.getElementById('discount').innerHTML;
	var total_amount          = document.getElementById('total_amount').innerHTML;
	var net_amount            = document.getElementById('net_amount').innerHTML;

	
	vehicle_number = vehicle_number.toUpperCase();
	vehicle_number = vehicle_number.replace(/\s/g, "");
	var data={vehicle_type:vehicle_type,vehicle_number:vehicle_number,driver_name:driver_name,transporter_name:transporter_name,mobile:mobile,source_city:source_city,destination_city:destination_city,agent_code:agent_code,qty_purchased:qty_purchased,price:price,discount:discount,total_amount:total_amount,net_amount:net_amount,agent_commision:agent_commision};
	
	if(vehicle_type!="-1" && vehicle_number!="" && driver_name!="" && transporter_name!="" && mobile!="" && source_city!="" && destination_city!=""  && qty_purchased!="" && price!=0 && discount!="")
	{
		$.ajax({
		type:"POST",
		url:"/add_order",
		data:data,
		success:function(data){
			if(data==1)
			{
				$('#preview').closeModal({
					complete: onCloseModal
				});
				
				//window.location.assign("/order");
			}
			else
			{
				$('#preview').closeModal({
					complete: agentErr
				});
				
			}
		}
	   });
	}
	else
	{
		if(price==0)
		{
			alert("Price per kg is not set! Please ask admin to set price per kg.");
		}
		else
		{
			showToast("All fields marked * must be filled!",5000);
		}
		
		//$('#modal1').modal('open');
	}
	
	
});

/*
$('#save_edits').click(function(){
	var agent_id              = document.getElementById('edit_agent_id').innerHTML;
	var agent_name            = $('#e_agent_name').val();
	var mobile                = $('#e_mobile').val();
	var address               = $('#e_address').val();
	var agent_code            = $('#e_agent_code').val();
	
    
	 //alert(product_name + "  "+ category + " " +sku_id + " " +unit_price + " " +tax + " " +price+ " " +selling_quantity_gms);
	
	if(agent_name!="" && mobile!="" && address!="" && agent_code!="")
	{
	var update_data={agent_id:agent_id,agent_name:agent_name,mobile:mobile,address:address,agent_code:agent_code,profile_photo_path:e_profile_photo_path,photo_id_path:e_photo_id_path};
	
	$.ajax({
		type:"POST",
		url:"/save_agent_edits",
		data:update_data,
		success:function(data){
			if(data==1)
			{
				//alert("Edited successfully!");
				window.location.assign("/agent");
			}
		}
	});
  }
  else
  {
	  alert("Something missing!");
  }
	
}); */




});



function edit_row(val)
{   
   $.ajax({
	   type:"GET",
	   url:"/get_agent_data_for_edit",
	   data:{agent_id:val},
	   success:function(data){
		 console.log(data);
		document.getElementById('e_agent_name').value=data[0].name;                           $( "#e_agent_name" ).focus(); 
	    document.getElementById('e_mobile').value=data[0].mobile;                             $( "#e_mobile" ).focus();
	    document.getElementById('e_address').value=data[0].address;                           $( "#e_address" ).focus();
	    document.getElementById('e_agent_code').value=data[0].agent_code;                     $( "#e_agent_code" ).focus();
		document.getElementById('edit_agent_id').innerHTML=val;                 
	   }
   });
	
     
}


function get_vehicle(vehicle_number)
{
	$.ajax({
		type:"GET",
		url:"/get_vehicles",
		data:{vehicle_number:vehicle_number},
		beforeSend:function(){
			$('.loader_div').show();
		},
		success:function(data){
			$('.loader_div').hide();
			if(data.length!=0)
			{
			document.getElementById('driver_name').value=data[0].driver_name;               $('#driver_name').focus();
			document.getElementById('transporter_name').value=data[0].transporter_name;     $('#transporter_name').focus();
			document.getElementById('mobile').value=data[0].mobile;                         $('#mobile').focus();
			document.getElementById('driver_name').value=data[0].driver_name;               $('#driver_name').focus();
			//$('<option>').val(data[0].source_city_id).text(data[0].source).appendTo('#source_city');
			document.getElementById('source_city').value=data[0].source_city_id;
			//$('<option>').val(data[0].destination_city_id).text(data[0].destination).appendTo('#destination_city');
			document.getElementById('destination_city').value=data[0].destination_city_id;
			document.getElementById('vehicle_type').value=data[0].category_id;
			var visit_no = Number(data[0].total_orders_of_vehicle) + 1;
			document.getElementById('vehicle_visit_number').innerHTML ="Total Visits: " + visit_no;
			}
		}
	});
}

function generate_preview(data)
{
	
var data = $.parseJSON(data);
document.getElementById('vehicle_type_p').innerHTML = data.vehicle_type;
document.getElementById('vehicle_number_p').innerHTML = data.vehicle_number;
document.getElementById('driver_p').innerHTML = data.driver_name;
document.getElementById('transporter_name_p').innerHTML = data.transporter_name;
document.getElementById('mobile_p').innerHTML = data.mobile;
document.getElementById('source_p').innerHTML = data.source_city;
document.getElementById('destination_p').innerHTML = data.destination_city;
document.getElementById('agent_p').innerHTML = data.agent_code;
document.getElementById('qty_purchased_p').innerHTML = data.qty_purchased;
//document.getElementById('price_p').innerHTML = data.price;
document.getElementById('discount_p').innerHTML = data.discount;
document.getElementById('net_amount_p').innerHTML = data.net_amount;

}


function show_total_amount()
{
	var price = document.getElementById('price').innerHTML;
	var qty_purchased = document.getElementById('qty_purchased').value;
	var total = Number(price) * Number(qty_purchased);
	document.getElementById('total_amount').innerHTML=total;
	show_net_amount();
}

function show_net_amount()
{
	var discount = document.getElementById('discount').innerHTML;
	var total_amount = document.getElementById('total_amount').innerHTML;
	var net = Number(total_amount) - Number(discount);
	document.getElementById('net_amount').innerHTML=net;
}

function get_discount(val)
{
	
	$.ajax({
		type:"GET",
		url:"/get_agent_data",
		data:{agent_code:val},
		success:function(data){
			  
			if(data.length==0)
			{
				alert("Agent does not exsist!");
			}
			else
			{
				document.getElementById("discount").innerHTML=data[0].agent_discount;
				agent_commision = data[0].commision;
			}
		}
	})
}