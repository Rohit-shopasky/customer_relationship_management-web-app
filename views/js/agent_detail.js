var profile_photo_path="";
var photo_id_path="";
var e_profile_photo_path="";
var e_photo_id_path="";

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

$('.modal').modal();
$('#open_modal').modal();
$('.edit_link').modal();
$('.open_view_id').modal();
$('.datepicker').datepicker({maxDate: new Date });

$('#filter_link').click(function(){
	var start_date = $('#start_date').val();
	var end_date   = $('#end_date').val();
	var agent_code = document.getElementById('agent_code_profile').innerHTML;
	
	  
     if(new Date(start_date).getTime() < new Date(end_date).getTime())
	 {
		 
	  // window.location.assign("/show_filtered_agent_visits?start_date=" +start_date + "&end_date=" +end_date);
	     
	    $.ajax({
			type:"GET",
			url:"/get_filtered_agent_visits_from_date",
			data:{start_date:start_date,end_date:end_date,agent_code:agent_code},
			success:function(data){
				document.getElementById('total_visits').innerHTML=data.orders_count[0].total_visits;
				
				var parent = $('#parent_table');
				//console.log(data.order_details)
				var order_details = data.order_details;
				parent.empty();
				for(var i=0;i<order_details.length;i++)
				{
					var tr = $('<tr></tr>');
					 
		
					var order_date     = $("<td href='#modal2' id='" + order_details[i].created_date + "' onclick='show_detail_orders(this.id)' class='modal-trigger edit_link'></td>").append(moment(order_details[i].created_date).format("MMM DD YYYY"));
					
					
					
					var total_orders   = $('<td href="#modal2" class="modal-trigger edit_link"></td>').append(order_details[i].total_orders);
				
					tr.append(order_date,total_orders);
					parent.append(tr);
				}
				
				
			}
		})
	  
	 }
	 else
	 {
		 
		 alert("Start date cannot be greater than End date!");
	 }
});


});

function show_detail_orders(created_date)
{
	var agent_code = document.getElementById('agent_code_profile').innerHTML;
	$.ajax({
		type:"GET",
		url:"/show_detail_orders_of_agents",
		data:{created_date:created_date,agent_code:agent_code},
		success:function(data){
			var parent = $('#parent_table2');
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








