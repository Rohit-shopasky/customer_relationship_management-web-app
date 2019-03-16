
// global variable

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
//$('#open_modal').leanModal();
//$('.edit_link').leanModal();
//$('.open_view_id').leanModal();

$('#filter_link').click(function(){
	var start_date = $('#start_date').val();
	var end_date   = $('#end_date').val();
	var search      = $('#search').val();
	
	

	if((start_date > end_date) && search!="" )
	{
		alert("Start date can't be less than end date!");
	}
	else
	{
		if(search!="")
		{
			
		    $.ajax({
					type:"GET",
					url:"/get_orders_by_transporter_name",
					data:{transporter_name:search,start_date:start_date,end_date:end_date},
					success:function(data){
					if(data.length!=0)
					{
					  create_table(data);
					}
					else
					{
					  alert("There are no orders with this Transporter!");
					}
				  }
				});
		}
		else
		{
			alert("Please enter Transporter name!");
		}
	}
	
	
	
 });



});

var global_row_id="";
function search(transporter_name)
{
	
	
	if(transporter_name.length!=0)
	{
		var parent=document.getElementById('search_result');

     $.ajax({
	  type:"GET",
      url:"/search_transporter",
      data:{transporter_name:transporter_name},
      success:function(data){
		  if(document.getElementById('search_list')!=undefined)
		  {

			$('#search_result').empty();
			if(global_row_id!="")
			document.getElementById(global_row_id).setAttribute("style","background-color:white");
		  }
		  
		  var collection=document.createElement('div');
		  collection.className="collection";
		  collection.id="search_list";
		  for(var i=0;i<data.length;i++)
		  { 
			  
			  var a=document.createElement("a");
		      a.className="collection-item";
		      a.innerHTML=data[i].transporter_name;
			  a.id=data[i].transporter_name;	
			  a.setAttribute("style","color:#ee6e73");
              a.onclick=function(){
				                     $('#table_data').empty();
									       var transporter_name = this.id;
                                          /*$.ajax({
										  type:"GET",
										  url:"/get_orders_by_transporter_name",
										  data:{transporter_name:transporter_name},
										  success:function(data){
											  if(data.length!=0)
											  {
												  create_table(data);
											  }
											  else
											  {
												  alert("There are no orders with this Transporter!");
											  }
										  }
									  }); 	*/			
     								 
					                 $('#search').val(transporter_name);
									 $('#search_result').empty(); 
			                      }	  
			  
		      collection.appendChild(a);
			  
			
		  }
		  
		  parent.appendChild(collection);
	    
		  
		 
	  }	  
      });
	}
	else
	{
		$('#search_result').empty();
	}
	
	/*$.ajax({
		type:"GET",
		url:"/search_transporter",
		data:{transporter_name:transporter_name},
		success:function(data){
			
		}
	}); */
}

function create_table(data)
{
    var parent = document.getElementById('table_data');
	while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
       }
	console.log(data);
	for(var i=0;i<data.length;i++)
	{
	  var tr = document.createElement("tr");
	  var order_id            =  $('<td></td>').text(data[i].order_id);
	  var vehicle_number      =  $('<td></td>').text(data[i].vehicle_number);
	  var quantity_purchased  =  $('<td></td>').text(data[i].qty_purchased);
	  var price               =  $('<td></td>').text(data[i].price);
	  var total_amount        =  $('<td></td>').text(data[i].total_amount);
	  var discount            =  $('<td></td>').text(data[i].discount);
	  var net_amount          =  $('<td></td>').text(data[i].net_amount);
	  
	  var created_date        =  convert_date(data[i].created_date);
	  
	  var created_date        =  $('<td></td>').text(created_date);
	  
	  $(tr).append(order_id,vehicle_number,quantity_purchased,price,total_amount,discount,net_amount,created_date);
	  $(parent).append(tr);
	}	
}

function convert_date(date)
{
	var date_string=new Date(date);
	  date_string=date_string.toString();
	  date_string=date_string.split(' ').slice(0, 5).join(' ');
	  created_date=date_string;
	  return created_date;
}