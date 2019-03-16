

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


$('#form_save').click(function(){
	var vehicle_type          = $('#vehicle_type').val();
	var vehicle_number        = $('#vehicle_number').val();
	var driver_name           = $('#driver_name').val();
	var transporter_name      = $('#transporter_name').val();
	var mobile                = $('#mobile').val();
	var source_city           = $('#source_city').val();
	var destination_city      = $('#destination_city').val();
	
	var data={vehicle_type:vehicle_type,vehicle_number:vehicle_number,driver_name:driver_name,transporter_name:transporter_name,mobile:mobile,source_city:source_city,destination_city:destination_city};
	
	if(vehicle_type!="" && vehicle_number!="" && driver_name!="" && transporter_name!="" && mobile!="" && source_city!="" && destination_city!="")
	{
		$.ajax({
		type:"POST",
		url:"/add_vehicle",
		data:data,
		success:function(data){
			if(data==1)
			{
				alert("Vehicle saved successfully!");
				window.location.assign("/vehicle");
			}
			else
			{
				alert("vehicle number already exsist!");
				
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



