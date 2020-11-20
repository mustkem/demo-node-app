var SITEURLFRONT = "http://10.0.4.4:1337/front";    
      var SITEURLFRONT = "http://10.0.4.4:1337/vendor"; 
function payment_method(method){
	var SITEURLFRONT = "http://10.0.4.4:1337/vendor";
	  $.ajax({
			 type: 'POST',
			 url: SITEURLFRONT+"/merchent_account/payment_form",			
			 data: $("#"+method).serialize(), 
			 success: function(response) {
			 	
				$('#'+method).modal('toggle');
			 }
		 });
}
function payment_method_data(method,post_url){	
	  $.ajax({
			 type: 'POST',
			 url: post_url+"merchent_account/Payment_By_Mail",			
			 data: $("#"+method).serialize(), 
			 success: function(response) {
			 	alert(response);
				$('#'+method).modal('toggle');
			 }
		 });
}
//Function for setData in product****************************************
function setdata(id){
	$.ajax({
						 type: 'POST',
						 url: VENDORURL+"product/set_attribute",
						 data: {atsetid :id}, 
						 success: function(response) {
						 	$("#add-product").html(response);
						 	 var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch-product'));
					       		
					        $('.js-switch').each(function() {
					            new Switchery($(this)[0], $(this).data());

					        });	
					        // Date Picker
                            $('.mydatepicker, #datepicker').datepicker();
                               $('.datepicker-autoclose').datepicker({
                               autoclose: true,
                                todayHighlight: true
                              });

						 }
					 });
}
//Function file upload at the time of product*******************************
function file_upload(){
	 	var data = new FormData(document.getElementById("add-product"));
		var url = ADMINSITEURL+"ajax/product_image_upload";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading-image").show();
           },
		    success: function(response)
		    {
		    	setTimeout(function() {
		        	$("#default_all_img").html(response);
		        	$("#loading-image").hide();
		    	}, 5000);
		       
		    }
	
	});
}
//Function to delete a item from list******************************
function delete_data_all(all,controller,function_name){	
swal({   
            title: "Are you sure?",   
            text: "all its subcontact will also delete ?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No, cancel",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                    var id = all.id;
                     var post_url = VENDORURL+controller+"/delete/"+id;
                        $.ajax({
                           type: 'POST',
                           url: post_url,
                           data: {}, 
                           success: function(response) {
                            if(response){
                              $('#'+controller+'_tbl').DataTable().destroy();
                              $('#'+controller+'_tbl').DataTable({
                                    "processing": true,
                                    "serverSide": true,
                                    "ordering": true,
                                    "ordering": true,
                                    "columnDefs": [ {
                                        "targets": 'no-sort',
                                        "orderable": false,
                                  } ],
                                    "ajax": VENDORURL+controller+'/'+function_name
                                 });
                              swal("Deleted!", "Your Data has been deleted.", "success");
                            }
                           }
                         });
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
}

//change status*************************** 
function changeStatus(rowid,status,controller){
	
	swal({   
            title: "Are you sure?",   
            text: "To change status ?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, change it!",   
            cancelButtonText: "No, cancel",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {$.ajax({
				 type: 'POST',
				 url: VENDORURL+controller+"/change_status",
				 data: {id:rowid, st:status}, 				 
				 success: function(response) {				 	
					$("#status_"+rowid).html(response);
					swal("Changed!", "Your status has been changed successfully", "success");
				 }
			 }); 
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
}

$(document).ready(function() {
    var st_id = $('.static_block').attr('data-identifier');
    var SITEURLFRONT = "http://10.0.4.4:1337/front";    
      var SITEURLFRONT = "http://10.0.4.4:1337/vendor"; 
    $.ajax({
			 type: 'POST',
			 url: SITEURLFRONT+"/managecms/get_cms_data",			
			 data: {st_id:st_id}, 
			 success: function(response) {
				 var elements = document.querySelectorAll('[data-identifier="'+st_id+'"]');
				 elements[0].innerHTML = response;
			 }
		 });

    $("#shop_name_availability").click(function(){
    	var shop = $("#shop_name").val();
    	if(shop){
    	 $.ajax({
			 type: 'POST',
			 url: SITEURLFRONT+"/merchent_account/check_shop_name",			
			 data: {shop_name:shop}, 
			 success: function(response) {
			 	alert(response.message);
					if(response.status == "ok"){
						$("#shop_name").after("<span class='form-error' style='color:green;'>"+response.message+"</span><br/>");
					}
					if(response.status == "fail"){
						$("#shop_name").val('');
						$("#shop_name").after("<span class='form-error' style='color:red;'>"+response.message+"</span><br/>");
					}
				}
			});
			} 
    	});
    $("#shop_name").blur(function(){
    	var shop = $("#shop_name").val();
    	if(shop){
    	 $.ajax({
			 type: 'POST',
			 url: SITEURLFRONT+"/merchent_account/check_shop_name",			
			 data: {shop_name:shop}, 
			 success: function(response) {
			 	alert(response.message);
					if(response.status == "ok"){
						$("#shop_name").after("<span class='form-error' style='color:green;'>"+response.message+"</span><br/>");
					}
					if(response.status == "fail"){
						$("#shop_name").val('');
						$("#shop_name").after("<span class='form-error' style='color:red;'>"+response.message+"</span><br/>");
					}
				}
			});
			} 
    	});
    
		$( "#all_check" ).change(function() {  		
  		if($("#all_check").is(":checked")){
  			$(".all_check").prop("checked", true);
  		}else{
  			$(".all_check").prop("checked", false);
  		}
	});

  //Function to change all status*****************************************
	$( "#action_submit" ).click(function() {

		var action_name = $("#action_change").val();
		
  		var controller = $("#cont").val();
  		var function_data = $("#fun").val();
  		var tbl = $("#cont").val();
  		
  		if(action_name == '2') {
					  swal({   
            title: "Are you sure?",   
            text: "all its subcontact will also delete ?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No, cancel",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) { 
            $.ajax({
			 type: 'POST',
			 url: VENDORURL+controller+"/change_all_status",
			 data: $("#tbl_form").serialize(), 
			 success: function(response) {		 	
				$('#'+tbl+'_tbl').DataTable().destroy();
						$('#'+tbl+'_tbl').DataTable({
					        "processing": true,
					        "serverSide": true,
					        "ordering": true,
					        "columnDefs": [ {
						          "targets": 'no-sort',
						          "orderable": false,
						    } ],
					        "ajax": VENDORURL+controller+"/"+function_data
					   	 });
                   swal("Deleted!", "Your Data has been deleted.", "success");
				$("#all_check").prop("checked", false);	
			 }
		 });    
                
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
			} 
		else{		
  		$.ajax({
			 type: 'POST',
			 url: VENDORURL+controller+"/change_all_status",
			 data: $("#tbl_form").serialize(), 
			 success: function(response) {		 	
				$('#'+tbl+'_tbl').DataTable().destroy();
						$('#'+tbl+'_tbl').DataTable({
					        "processing": true,
					        "serverSide": true,
					        "ordering": true,
					        "columnDefs": [ {
						          "targets": 'no-sort',
						          "orderable": false,
						    } ],
					        "ajax": VENDORURL+controller+"/"+function_data
					   	 });

				$("#all_check").prop("checked", false);	
			 }
		 });
	  }
   	});
   	$("#submit_form" ).click(function() {
   		$.ajax({
			 type: 'POST',
			 url: VENDORURL+"merchent_account/merchect_payment",
			 data: $("#form-data").serialize(), 
			 success: function(response) {		

				window.location=VENDORURL+"merchent_account/set_upbilling";
			 }
		 });
   	})

}); 


