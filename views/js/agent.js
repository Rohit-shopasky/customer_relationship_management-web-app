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


$('#open_modal').leanModal();
$('.edit_link').leanModal();
$('.open_view_id').leanModal();


$('#form_save').click(function(){
	var agent_name            = $('#agent_name').val();
	var mobile                = $('#mobile').val();
	var address               = $('#address').val();
	var agent_code            = $('#agent_code').val();
	var agent_discount        = $('#agent_discount').val();
	var agent_commision       = $('#agent_commision').val();
	
	var data={agent_name:agent_name,mobile:mobile,address:address,agent_code:agent_code,photo_id_path:photo_id_path,profile_photo_path:profile_photo_path,photo_id_path:photo_id_path,agent_discount:agent_discount,agent_commision:agent_commision};
	
	if(agent_name!="" && mobile!="" && address!="" && agent_code!="")
	{
		$.ajax({
		type:"POST",
		url:"/add_agent",
		data:data,
		success:function(data){
			if(data==1)
			{
				alert("Agent saved successfully!");
				window.location.assign("/agent");
			}
			if(data==0)
			{
				alert("Mobile Number already exsist!")
				window.location.assign("/agent");
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
	var agent_discount        = $('#e_agent_discount').val();
	var agent_commision       = $('#e_agent_commision').val();
    
	 //alert(product_name + "  "+ category + " " +sku_id + " " +unit_price + " " +tax + " " +price+ " " +selling_quantity_gms);
	
	if(agent_name!="" && mobile!="" && address!="" && agent_code!="" && agent_code!="")
	{
	var update_data={agent_id:agent_id,agent_name:agent_name,mobile:mobile,address:address,agent_code:agent_code,profile_photo_path:e_profile_photo_path,photo_id_path:e_photo_id_path,agent_discount:agent_discount,agent_commision:agent_commision};
	
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
		document.getElementById('e_agent_discount').value = data[0].agent_discount;           $('#e_agent_discount').focus();
		document.getElementById('e_agent_commision').value=data[0].commision;                 $('#e_agent_commision').focus();
		
		
		document.getElementById('edit_agent_id').innerHTML=val;                 
	   }
   });
	
     
}



function upload_profile_photo()
{
	var form = document.forms.namedItem("photo");
    oData = new FormData(form);
	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		 
		if(req.status==200 && req.readyState==4)
		{  profile_photo_path=req.responseText;
	       if(profile_photo_path!=-1)
		   {
		    //alert(profile_photo_path);
		   }
		   else
		   {
			   //alert("Please select only image files!");
			   profile_photo_path="";
			   showToast("Please select only image files!",3000);
		   }
		}
	}
	req.open("POST","/upload_profile_pic",true);
	req.send(oData);
}


function upload_photo_id()
{
	var form = document.forms.namedItem("photo_id");
    oData = new FormData(form);
	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		 
		if(req.status==200 && req.readyState==4)
		{  photo_id_path=req.responseText;
	       if(photo_id_path!=-1)
		   {
		    //alert(photo_id_path);
		   }
		   else
		   {
			   //alert("Please select only image files!");
			   photo_id_path="";
			   showToast("Please select only image files!",3000);
		   }
		}
	}
	req.open("POST","/upload_photo_id",true);
	req.send(oData);
}

function e_upload_profile_photo()
{
	var form = document.forms.namedItem("e_photo");
    oData = new FormData(form);
	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		 
		if(req.status==200 && req.readyState==4)
		{  e_profile_photo_path=req.responseText;
	       if(e_profile_photo_path!=-1)
		   {
		    //alert(e_profile_photo_path);
		   }
		   else
		   {
			   //alert("Please select only image files!");
			   e_profile_photo_path="";
			   showToast("Please select only image files!",3000);
		   }
		}
	}
	req.open("POST","/e_upload_profile_pic",true);
	req.send(oData);
}

function e_upload_photo_id()
{
	var form = document.forms.namedItem("e_photo_id");
    oData = new FormData(form);
	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		 
		if(req.status==200 && req.readyState==4)
		{  e_photo_id_path=req.responseText;
	       if(e_photo_id_path!=-1)
		   {
		    //alert(e_photo_id_path);
		   }
		   else
		   {
			   //alert("Please select only image files!");
			   e_photo_id_path="";
			   showToast("Please select only image files!",3000);
		   }
		}
	}
	req.open("POST","/e_upload_photo_id",true);
	req.send(oData);
}

function set_image(path)
{
	var image=document.getElementById('id_image');
	image.setAttribute("src",path);
}

function show_agent_detail(agent_code,agent_name)
{
	window.location.assign("/get_agent_detail?agent_code=" + agent_code + "&agent_name=" +agent_name);
}
