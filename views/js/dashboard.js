$(document).ready(function(){
	

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
	
var today_month = moment().format("MMMM YYYY");
document.getElementById('today_month').innerHTML = today_month;	
	
$('#calendar').fullCalendar({
defaultDate: '2019-01-01',
header: {
    left: '',
    center: 'All orders',
    right: ''
  },
 /*
 events: [
        {
          title: 'All Day Event',
          start: '2018-03-01',
		  end:'2018-03-01',
        },
  
      ] */
	  
	events:function(start, end, timezone, callback) {
    $.ajax({
      url: '/get_all_orders_this_month',
      success: function(doc) {
		var orders = doc[0].orders + " Orders"; 
		var start_date = moment(doc.created_date).format("YYYY-MM-DD");
		var end_date = start_date;
        var events = [];
        doc.forEach(function(result) {
			console.log(result);
          events.push({
            title: orders,
            start: start_date,
			end:end_date,
          });
		  console.log(events);
        }); 
        callback(events);
      }
    });
  } 
	  
 });
	
})