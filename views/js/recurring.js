

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


//$('#open_modal').leanModal();
//$('.edit_link').leanModal();
//$('.open_view_id').leanModal();
$('.modal').modal();
 $('.datepicker').datepicker({
	 autoClose:true,
	 maxDate: new Date 
 });

$('#filter_link').click(function(){
	var start_date = $('#start_date').val();
	var end_date   = $('#end_date').val();
	
	  
     if(new Date(start_date).getTime() < new Date(end_date).getTime())
	 {
		 
	   window.location.assign("/show_filtered_recurring?start_date=" +start_date + "&end_date=" +end_date);
	 }
	 else
	 {
		 
		 alert("Start date cannot be greater than End date!");
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


function show_orders(transporter_name)
{   
        $.ajax({
			type:"GET",
			url:"/get_orders_from_transporter_name",
			data:{transporter_name:transporter_name},
			success:function(data){
				
				
				var parent = $('#parent_table');
				parent.empty();
				for(var i=0;i<data.length;i++)
				{
					var tr = $('<tr></tr>');
					var order_no       = $('<td></td>').append(data[i].order_id); 
					var qty_purchased  = $('<td></td>').append(data[i].qty_purchased);
					var price          = $('<td></td>').append(data[i].price);
					var total_amount   = $('<td></td>').append(data[i].total_amount);
					var discount       = $('<td></td>').append(data[i].discount);
					var net_amount     = $('<td></td>').append(data[i].net_amount);
				    var vehicle_no     = $('<td></td>').append(data[i].vehicle_number);
					var order_date     = $('<td></td>').append(moment(data[i].created_date).format("MMM DD YYYY"));
					tr.append(order_no,qty_purchased,price,total_amount,discount,net_amount,vehicle_no,order_date);
					parent.append(tr);
				}
				
			}
			
			
		}) 
}



