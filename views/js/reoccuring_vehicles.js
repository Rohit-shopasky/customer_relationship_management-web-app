

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
	 maxDate: new Date 
 });

$('#filter_link').click(function(){
	var start_date = $('#start_date').val();
	var end_date   = $('#end_date').val();
	var times      = $('#times').val();
	

	if((start_date > end_date) && times!="" )
	{
		alert("Start date can't be less than end date!");
	}
	else
	{
		if(times!="")
		{
		window.location.assign("/get_data_of_reoccuring_vehicles?start_date=" +start_date + "&end_date=" +end_date + "&times=" +times);
		}
		else
		{
			alert("Please enter occurance!");
		}
	}
	
	
	
 });

});




function show_orders(vehicle_no)
{   
        $.ajax({
			type:"GET",
			url:"/get_orders_from_vehicle_no",
			data:{vehicle_no:vehicle_no},
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






