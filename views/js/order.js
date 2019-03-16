

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

$('.datepicker').datepicker({maxDate: new Date });
$('#open_modal').modal();
$('.edit_link').modal();
$('.open_view_id').modal();

$('#filter_link').click(function(){
	var start_date = $('#start_date').val();
	var end_date   = $('#end_date').val();

	if(new Date(start_date).getTime() > new Date(end_date).getTime())
	{
		alert("Start date can't be greater than End date!");
	}
	else
	{
	window.location.assign("/show_filtered_orders?start_date=" +start_date + "&end_date=" +end_date);
	}
});

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
	var price                 = $('#price').val();
	var discount              = $('#discount').val();
	
	var data={vehicle_type:vehicle_type,vehicle_number:vehicle_number,driver_name:driver_name,transporter_name:transporter_name,mobile:mobile,source_city:source_city,destination_city:destination_city,agent_code:agent_code,qty_purchased:qty_purchased,price:price,discount:discount};
	
	if(vehicle_type!="-1" && vehicle_number!="" && driver_name!="" && transporter_name!="" && mobile!="" && source_city!="" && destination_city!="" && agent_code!="")
	{
		$.ajax({
		type:"POST",
		url:"/add_order",
		data:data,
		success:function(data){
			if(data==1)
			{
				alert("Order saved successfully!");
				window.location.assign("/order");
			}
			else
			{
				alert("Agent code does not exsist!");
				
			}
		}
	   });
	}
	else
	{
		showToast("All fields marked * must be filled!",5000);
		//$('#modal1').modal('open');
	}
	
	
});


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
	
});

$('#delete_agent').click(function(){
	var agent_id=document.getElementById('edit_agent_id').innerHTML;
	$.ajax({
		type:"POST",
		url:"/delete_agent",
		data:{agent_id:agent_id},
		success:function(data){
			if(data==1)
			{
				//alert("Product deleted successfully!");
				window.location.assign("/agent");
			}
		}
	})
})


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
		success:function(data){
			
			document.getElementById('driver_name').value=data[0].driver_name;               $('#driver_name').focus();
			document.getElementById('transporter_name').value=data[0].transporter_name;     $('#transporter_name').focus();
			document.getElementById('mobile').value=data[0].mobile;                         $('#mobile').focus();
			document.getElementById('driver_name').value=data[0].driver_name;               $('#driver_name').focus();
			//$('<option>').val(data[0].source_city_id).text(data[0].source).appendTo('#source_city');
			document.getElementById('source_city').value=data[0].source_city_id;
			//$('<option>').val(data[0].destination_city_id).text(data[0].destination).appendTo('#destination_city');
			document.getElementById('destination_city').value=data[0].destination_city_id;
			document.getElementById('vehicle_type').value=data[0].category_id;
			
		}
	});
}
