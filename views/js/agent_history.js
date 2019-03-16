

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

$('.datepicker').datepicker({
	 //format:'mmm-d-yyyy'
	 maxDate: new Date 
	 
 });

//$('#open_modal').modal();
//$('.edit_link').modal();
//$('.open_view_id').modal();


$('#submit').click(function(){
	var agent_code = $('#agent_code').val();
	var start_date = $('#start_date').val();
	var end_date   = $('#end_date').val();
	
    
	
	if(agent_code!="")
	{
		if(start_date!="" && end_date!="")
		{
			if(new Date(start_date).getTime() < new Date(end_date).getTime())
			{
				window.location.assign("/agent_history?agent_code=" + agent_code + "&start_date=" +start_date + "&end_date=" +end_date);
			}
			else
			{
				alert("Start date can't be greater than end date!");
			}
		}
		
		window.location.assign("/agent_history?agent_code=" + agent_code + "&start_date=" +start_date + "&end_date=" +end_date);
		
	}
	else
	{
		alert("Agent code is required!");
	}
	
	
	
})



});







