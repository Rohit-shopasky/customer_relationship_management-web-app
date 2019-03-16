
var page_ids  = new Array();
var page_names= new Array();
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
$('.edit_link').leanModal({});
//open_view_id').leanModal();
$('select').material_select();


$('#save_edits').click(function(){
	
	var user_name = $('#e_user_name').val();
	var email     = $('#e_email').val();
	//var page_ids  = document.getElementById('page_id').innerHTML;
	var user_id   = document.getElementById('edit_user_id').innerHTML; 
	$.ajax({
		type:"POST",
		url:"/change_permission",
		data:{user_id:user_id,page_id:page_ids,user_name:user_name,email:email},
		success:function(data){
			if(data==1)
			{
				alert("Your changes are saved. If changes are not visible kindly refresh the page.");
				window.location.assign("/role");
			    
			}
		}
	});
	
});

/*
$('#add').click(function(){
	var page_id = $('#access_pages').val();
	
	
	if(page_ids.indexOf(parseInt(page_id,10)) === -1) {
      page_ids.push(page_id);
	  var page_name = document.getElementById(page_id).innerHTML;
	    if(page_names.indexOf(page_name) === -1) {
        page_names.push(page_name);
       }
    }
	document.getElementById('page_id').innerHTML=page_ids;
	document.getElementById('page_name').innerHTML=page_names
	//alert(page_names);
}); */

$('#add').click(function(){
	
	var page_id = $('#access_pages').val();

	var p_id      = Number(page_id);
	var page_name = document.getElementById(page_id).innerHTML; 
	if(page_ids.indexOf(p_id)==-1)
	{
		page_ids.push(p_id);
		page_names.push(page_name);
	}
	
	document.getElementById('page_id').innerHTML   = page_ids
	document.getElementById('page_name').innerHTML = page_names;
	
})

$('#remove').click(function(){
	
	var page_id = $('#access_pages').val();
	var p_id = Number(page_id);
	var page_name = document.getElementById(page_id).innerHTML;
	if(page_ids.indexOf(p_id)!=-1)
	{
		page_ids.pop(p_id);
		page_names.pop(page_name);
	}
	document.getElementById('page_id').innerHTML=page_ids;
	document.getElementById('page_name').innerHTML=page_names;
	
});

$('#remove_all').click(function(){
	
	page_ids   = [];
	page_names = [];
	document.getElementById('page_id').innerHTML=page_ids;
	document.getElementById('page_name').innerHTML=page_names;
	
})


});


function permit()
{
	
	
	/*var page_ids = document.getElementById('access_pages').value;
	var user_id  = document.getElementById('edit_user_id').innerHTML;
	alert(user_id + " " +access_pages);
    $.ajax({
		type:"POST",
		url:"/change_permission",
		data:{user_id:user_id,page_id:page_ids},
		success:function(data){
			
		}
	}); */
}

function get_user_data(user_id)
{
	$.ajax({
		type:"GET",
		url:"/get_user_data",
		data:{user_id:user_id},
		success:function(data){
			  
			  page_ids=[];
			  page_names=[];			  
			  document.getElementById('page_id').innerHTML="";
			document.getElementById('page_name').innerHTML="";
			document.getElementById('e_user_name').value=data.result[0].user_name;          $( "#e_user_name" ).focus(); 
			document.getElementById('e_email').value=data.result[0].email;                  $( "#e_email" ).focus();
			document.getElementById("edit_user_id").innerHTML=user_id;
			var alc = data.alc;
			var all_pages = data.all_pages;
			
		    for(var i=0;i<alc.length;i++)
			{
				for(j=0;j<all_pages.length;j++)
				{
					if(alc[i].page_id==all_pages[j].page_id)
					{
						page_names.push(all_pages[j].page_name);
						page_ids.push(Number(all_pages[j].page_id));
					}
				}
			}
			
			document.getElementById('page_id').innerHTML=page_ids;
			document.getElementById('page_name').innerHTML=page_names;
			$("#access_pages").material_select("update");
			
		}
	})
}



