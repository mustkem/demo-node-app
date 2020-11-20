
$(document).on('changeDate','.datepick', function() { $(this).focusout()  });

$(document).ready(function(){
	// $("form").find("input,select").each(function(){
	// //	console.log($(this).parent().prop("tagName"))
	// 	if($(this).parent().prop("tagName") != "FORM")
	// 	$(this).parent().addClass("form-group");
	// });

   // $('#managepo_tbl_filter:input').attr("placeholder", "Search ddfg");
    $('#managepo_tbl_filter:input', $(this)).each(function(index) 
    {
   //   this.value = "";
      console.log(this)
      console.log("-----------------")
    })

    autoselect_select2();

 $('.numberkey').keypress(function (event) {
        return isNumber(event, this)
    });


	$('.form-group div').addClass('form-group');
    $('.delete_logo').click(function(){
            $("#prevlogo_image").val('');
            $('#logo_src').remove();
            $(".delete_logo").hide();
        });
        $('.delete_logo_new').click(function(){
            $("#logo_image").val('');
            $("#dvPreview1_image").hide();
            $(".delete_logo_new").hide();
        });

        $('.delete_banner').click(function(){
            $("#prevbanner_image").val('');
            $('#banner_src').remove();
            $(".delete_banner").hide();
        });

        $('.delete_banner_new').click(function(){
            $("#banner_image").val('');
            $("#dvPreview_image").hide();
            $(".delete_banner_new").hide();
        });

        $('.delete_blog_new').click(function(){
            $("#blog_image").val('');
            $("#dvPreview_image").hide();
            $(".delete_blog_new").hide();
        });      

        $("#shiping_group").on("change",function(){
            var shippinggroup = $("#shiping_group").val();
            if(shippinggroup ==''){
              $(".courier-shipping").css("display", "block");
            }else{
                $("#shiping_template").val('');
              $(".courier-shipping").css("display", "none");
            }
        });

        $('#vendorRequestTable').on('click','.approve_to_vendor',(event)=>{

          let userid = event.target.getAttribute('data-userid');
          let payload = {userid};
          var data = new FormData();
          data.append("json",JSON.stringify(payload));

          fetch('/admin/vendor/approve',{
            method :'POST',
            body: 'userid='+userid,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
          }).then((res)=>{
            return res.json()
          }).then((data)=>{
            if(data.success == 'approved'){
                event.target.innerText = 'Approved'
              }
              else{
                alert('something went wrong')
              }
            
          })

        })
})

//new code 

function div_toggel(id) {
    var id_val = id + "_checkbox";
    if ($('#' + id_val).is(":checked")) {
        $('.' + id + '_btn').show(200);
        $('.' + id + '_table').show(200);
        $("." + id + "_disable").removeAttr("disabled");
        $("." + id + "_required").attr("data-validation", "required");
    } else {
        $('.' + id + '_btn').hide(200);
        $('.' + id + '_table').hide(200);
        $("." + id + "_disable").attr("disabled", "disabled");
        $("." + id + "_required").removeAttr("data-validation");
    }
}

function delete_school_image(del) {
    $("#image_" + del).remove();
}

//function riputed_status(id){  
$('body').on('change', '.riputed_status', function(e) {
    var id=jQuery(this).attr('data-attr');
    var status = $("#riputedorder_status_"+id).val();
    swal({
            title: "Are you sure?",
            text: "You want to change status ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {
                $.ajax({
                    type : "POST",
                    url : ADMINSITEURL + "riputed_return/update_riputed_order",
                    data : { id : id, status : status },
                    success : function(response){
                    swal("Changed!", "Your status has been changed successfully", "success");
                    $('#riputed_return_tbl').DataTable().destroy();
                    $('#riputed_return_tbl').DataTable({
                          "processing": true,
                          "serverSide": true,
                          "ordering": true,
                          "sDom": 'Rfrtlip',
                          "columnDefs": [ {
                              "targets": 'no-sort',
                              "orderable": false,
                        } ],
                          "ajax": ADMINSITEURL+'riputed_return/all_riputed_return'
                       });
                    }
                }); 
        }
        else{
                swal("Cancelled", "Your data is safe :)", "error");
        }
    });     
});



function remove_div(id) {
    $('#' + id).remove();
    //console.log(id);
    $('#' + id).parent('tr').remove();
}
function delete_data_all(all,controller,function_name){
swal({
            title: "Are you sure?",
            text: "all its subcontact will also delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, cancel",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function(isConfirm){
            if (isConfirm) {
            var id = all.id;
             var post_url = ADMINSITEURL+controller+"/delete/"+id;
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
                            //"ajax": ADMINSITEURL+controller+'/'+function_name
                            "ajax": {
                                url: ADMINSITEURL+controller+'/'+function_name,
                                type: "POST"
                            }
                         });
                      
                      swal("Deleted!", "Your Data has been deleted.", "success");
                    }
                   }
                 });
            } else {
              return true;
            }
        });
}




function checkAllmenu(menuid){
	if($('#'+menuid).is(':checked')){
		$('.'+menuid).prop('checked', true);
	}
	else{
		$('.'+menuid).prop('checked', false);
	}
}
function check_star(str){
var str_val = str.value;
//alert(str_val.length);
	if(str_val.length==0){
		$(str).val('*');
	}
}

function upload_banner_image(){
	var file_data = $('#banner_images').prop('files');
    var form_data = new FormData();
		for(var i=0;i< file_data.length;i++){
			form_data.append('file', file_data[i]);
		}
		//$(".loading-image").show()
    $.ajax({
        url: '/admin/managebanner/upload_banner_image', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            $("#result").html(response); // display response from the PHP script, if any

        },

		complete: function(){
        //$('#loading-image').hide();
      }
    });
}
function delete_product_image(del) 
{
    $("#image_" + del).remove();
}
function topsearch_data(time){
	var data = time ? time : '';
	$.ajax({
		type : 'POST',
		url : ADMINSITEURL + "dashboard/topsearch_data",
		data : { time : time},
		success : function(response){
			var html = '';
			for(var i=0; i<response.length; i++){

				html += "<tr><td  id='name'><strong class='topserchnme'>"+response[i]._id+"</strong><span class='topserchcount'>"+response[i].counts+"</span></td></tr> ";
			}
			$("#top_search_data").html(html);
		}
	});
}
function topproduct_data(time){
	var data = time ? time : '';
	$.ajax({
		type : 'POST',
		url : ADMINSITEURL + "dashboard/topproduct_data",
		data : { time : time},
		success : function(response){

			var html = '';
			if(response.length >0){
				for(var i=0; i<response.length; i++){
					var name = response[i].name;

					html += "<tr><td  id='name'><a href="+ADMINSITEURL+"product/edit/"+response[i].id+" target='_blank'>"+name+"</a></td></tr>";
				}
			}
			else{
				html += "No data available";
			}
			$("#top_product_data").html(html);
		}
	});
}

function all_monthly_order_graphdata(month,count_data){
	var cat=month;
    var category=cat.split(",");
    var countdata=count_data;
    var data=countdata.split(",");

    var count_array=[];
    for(var i=0; i<data.length;i++)
    {
      count_array[i] = parseInt(data[i]);
    }

    Highcharts.chart('container', {
    chart: {
    type: 'spline'
    },
    title: {
    text: ''
    },
    // subtitle: {
    // text: 'Source: SuperKick'
    // },
    exporting: {
      enabled: false
    },
    credits: {
        enabled: false
    },
    xAxis: {
    /*categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']*/
    categories:category,
    },
    yAxis: {
    title: {
      text: 'Order'
    },
    labels: {
      formatter: function () {
        return this.value;
      }
    }
    },
    tooltip: {
    crosshairs: true,
    //shared: true
    },
    plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: '#666666',
        lineWidth: 1
      }
    }
    },
    series: [{
    showInLegend: false,
    name: 'Order',
    marker: {
      symbol: 'circle'
    },
    //data: [7, 6, 9, 14, 18, 21, 25, 23, 18, 13, 9,25]
    //data: [0,0,0,0,0,3,0,0,0,0,0,0]
    data: count_array

    }]
    });
}

function dashboard_data(time){
	var data = time ? time:'';
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"dashboard/dashboard_data",
			 data: {time:time},
			 success: function(response) {
				$("#morris-donut-chart").empty();
				$(".order1").html(response.total_order);
				$(".order2").html(response.cancelled);
				$(".order3").html(response.delivered);
				 Morris.Donut({
						 element: 'morris-donut-chart',
						 data: [{
								 label: "Orders",
								 value: response.total_order,
						 }, {
								 label: "Cancelled",
								 value: response.cancelled,
						 }, {
								 label: "Delivered",
								 value: response.delivered
						 }],
						 resize: true,
						 colors:['#fb9678', '#01c0c8', '#4F5467']
				 });
			 }
		 });
}


function loadFile(event){
    var output = document.getElementById('output');
	var output_image = document.getElementById('output_image');
	$("#output").show();
   // $("#category_image").val(response.catdetail.category_image);
	output_image.src =URL.createObjectURL(event.target.files[0]);
    console.log(JSON.stringify(event.target.files[0]))
}

function loadFile_data(event){
    var output = document.getElementById('dvPreview_image');
    var output_image = document.getElementById('my_category_image');
    $("#dvPreview_image").show();
 //   $('#category_icon').val(response.catdetail.category_icon);
    output_image.src =URL.createObjectURL(event.target.files[0]);
    console.log(JSON.stringify(event.target.files[0]))
}


function loadFileIm(event,field_name){
	var output = document.getElementById(field_name);
	$("#"+field_name).show();
	output.src =URL.createObjectURL(event.target.files[0]);
}

function preview_image_data(str,im_id){
	$("#"+im_id).show();
	document.getElementById(im_id).src = window.URL.createObjectURL(str.files[0]);
}

function checkAllsubmenu(menuid){

	var array = menuid.split("_");
	var menu_id_val = $("#"+menuid).val();
	if($('#'+menuid).is(':checked')){
		$('.'+menuid).prop('checked', true);
        ('.submenu_'+menu_id_val)
		$('.submenu_'+menu_id_val).prop('checked', true);
	}
	else{
		$('.'+menuid).prop('checked', false);
		$('.submenu_'+menu_id_val).prop('checked', false);
	}
	var len = $('.menu_'+array[2]+':checked').length;
	if(len >0){
		$('#menu_'+array[2]).prop('checked', true);
	}
	else{
		$('#menu_'+array[2]).prop('checked', false);
	}
}

function checksubmenuPermission(menuid){
	var array = menuid.split("_");
	var idmenu = array[2];
	var idsubmenu = array[1];

	//menu
	var lensubmenu = $('.submenu_'+idsubmenu+':checked').length;
	if(lensubmenu>0){
		$('#submenu_'+idsubmenu+"_"+idmenu).prop('checked', true);
	}
	else{
		$('#submenu_'+idsubmenu+"_"+idmenu).prop('checked', false);
	}

	//submenu
	var lenmenu = $('.menu_'+idmenu+':checked').length;
	if(lenmenu>0){
		$('#menu_'+idmenu).prop('checked', true);
	}
	else{
		$('#menu_'+idmenu).prop('checked', false);
	}

}

function check_brand_urlkey(str,field_name,id){
	var eid ="#"+field_name;
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/check_brand_urlkey",
			 data: {st:str,bid:id},
			 success: function(response) {
                
			 	/*if(!response.status){
			 		$(eid).val('');
			 		$(eid).after("<span class='form-error' style='color:red;'>"+response.message+"</span>");
			 	}*/

			 }
		 })
}


function check_giftcategory_urlkey(str, field_name, id){
	var eid = "#"+field_name;

	$.ajax({
		type : "POST",
		url : ADMINSITEURL + "ajax/check_giftcategory_urlkey",
		data : { st : str, bid : id },
		success : function(response){
			if(!response.status){
				$(eid).val('');
				$(eid).after("<span class='form-error' style='color:red;'>"+ response.message+"</span>");
			}
		}
	});
}

function check_giftcard_urlkey(str, field_name, id){
	var eid = "#"+field_name;
	$.ajax({
		type : "POST",
		url : ADMINSITEURL + "ajax/check_giftcard_urlkey",
		data : { st : str, bid : id },
		success : function(response){
			if(!response.status){
				$(eid).val('');
				$(eid).after("<span class='form-error' style='color:red;'>"+ response.message+"</span>");
			}
		}
	});
}

function check_giftcard_price(str){
	var price_from = $('#price_from').val();

	if(parseInt(price_from) > parseInt(str)){
		var message = "Price To should be greater than Price From";
		$("#price_to").after("<span class='form-error' style='color:red;'>"+message+"</span>");
		//$("#price_to").val(null);
		$("#price_to").val(null);
		//alert(message);
	}
}

//Function for checking user already exist******************
function check_username(str,field_name,id){
	var eid ="#"+field_name;
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/check_username",
			 data: {st:str,bid:id},
			 success: function(response) {
			 	if(!response.status){
			 		//alert(eid);
			 		$(eid).val('');
			 		$(eid).after("<span class='form-error' style='color:red;'>"+response.message+"</span>");
			 	}

			 }
		 })
}

//Function for changing status as Approved for vendor request******************
function status_approved(id){
   $.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"vendorrequest/status_approved",
			 data: {vendorid:id},
			 success: function(response) {
			 	if(response.status){
			 		window.location.href=response.nextURL;
			   }
			}
		 })
}
//Function for checking vendor already exist******************
function check_vendorname(str,field_name,id){
	var eid ="#"+field_name;
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/check_vendorname",
			 data: {st:str,bid:id},
			 success: function(response) {
			 	if(!response.status){
			 		//alert(eid);
			 		$(eid).val('');
			 		$(eid).after("<span class='form-error' style='color:red;'>"+response.message+"</span>");
			 	}

			 }
		 })
}

//Function for checking vendor already exist******************

// Function for checking vendor group name already exist **************
function check_vendorgroup(str, field_name, id){
	var eid = "#"+field_name;
	$.ajax({
		type : 'POST',
		url : ADMINSITEURL + "ajax/check_vendorgroup",
		data : { st : str, bid : id },
		success : function(response){
			if(!response.status){
				$(eid).val(str);
				$(eid).after("<span class = 'form-error' style ='color:red;'>" + response.message + "</span>");
			}
		}
	});
}

// Function for checking Newsletter template group name already exist **************
function check_tempgroup(str, field_name, id){
	var eid = "#"+field_name;
	$.ajax({
		type : 'POST',
		url : ADMINSITEURL + "ajax/check_tempgroup",
		data : { st : str, bid : id },
		success : function(response){
			if(!response.status){
				$(eid).val(str);
				$(eid).after("<span class = 'form-error' style ='color:red;'>" + response.message + "</span>");
			}
		}
	});
}
// Function for checking vendor group name already exist **************
function check_coupon_code(str,field_name,id){
	var eid ="#"+field_name;
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/check_coupon_code",
			 data: {st:str,bid:id},
			 success: function(response) {
			 	if(!response.status){
			 		//alert(eid);
			 		$(eid).val(str);
			 		$(eid).after("<span class='form-error' style='color:red;'>"+response.message+"</span>");
			 	}

			 }
		 })
}

// check category list show hide
function select_category(cat){
	if(cat == 'yes'){
		$("#category_list").css("display", "block");
	}
	else {
		$("#category_list").css("display", "none");
	}
}
// check category list show hide

// check product list show or hide
function select_product(product){
	if(product == "yes"){
		$(".product_list").css("display", "block");
	}
	else{
		$(".product_list").css("display", "none");
	}
}

// check product list show or hide
// check vendor list show or hide
function select_vendor(vendor){
	if(vendor == "yes"){
		$(".vendor_list").css("display", "block");
	}
	else{
		$(".vendor_list").css("display", "none");
	}
}

// check vendor list show or hide
//check discount Amount******************
function check_discount(){
	var t_val =  $("#discount_type").val();

        if(t_val == '2' && $("#discount_amount").val()!=""){
            if(parseInt($("#discount_amount").val()) >100){
             alert("Please enter valid percentage value");
               // $("#discount_amount").after("<span class='form-error' style='color:red;'>Please enter valid percentage value.</span>");
                $("#discount_amount").val('');
            }
          }

}
//check discount Amount******************
function check_discount_type(t_val){
	if(t_val == '2'){
            if(parseInt($("#discount_amount").val()) >100){
                $("#discount_amount").val('');
                $("#discount_amount").after("<span class='form-error' style='color:red;'>Please enter valid percentage value.</span>");
            }
            $("#max_amt").css("display","block");
          }
          else{
			   $("#max_amt").css("display","none");
			  }

}
//vendor_payment_method
function vendor_payment_method(ven_id,method){
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/vendor_payment_method",
			 dataType: "json",
			 data: {vendorid:ven_id,method:method},
			 success: function(response) {
			 	
			 	$("#input-"+method).val(response.other_detail.paypal_email);


			 }
		 })
}
//submit paypal form
function submit_form(form_id){
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/submit_form",
			 dataType: "json",
			 data: $('#'+form_id).serialize(),
			 success: function(response) {

			 	$("#input-PAYPAL").after("<span class='form-error' style='color:green;'>"+response+"</span>");
			 }
		 })
}
//submit_payment_by_email
function submit_payment_by_email(form_id){
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/submit_payment_by_email",
			 dataType: "json",
			 data: $('#'+form_id).serialize(),
			 success: function(response) {

			 	$("#payment_by_mail-success").after("<span class='form-error' style='color:green;'>"+response+"</span>");
			 }
		 })
}
//submit main form
function submit_main_form(){

	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/submit_main_form",
			 dataType: "json",
			 data: $('#page-wrapper').find('select, textarea, input').serialize(),
			 success: function(response) {
			 	if(response=="ok"){
			 		window.location.href=ADMINSITEURL+"vendorrequest";
			 	}
			 }
		 })
}

//change status***************************
function changeStatus(rowid,status,controller){
	var controller = $("#cont").val();
  	var function_data = $("#fun").val();
    var tbl = controller;
	swal({
            title: "Are you sure?",
            text: "You want to change status ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) { 
                $.ajax({
				 type: 'POST',
				 url: ADMINSITEURL+controller+"/change_status",
				 data: {id:rowid, st:status},
				 success: function(response) {                    
					$("#status_"+rowid).html(response);
					$('#'+tbl+'_tbl').DataTable().destroy();
						$('#'+tbl+'_tbl').DataTable({
					        "processing": true,
					        "serverSide": true,
					        "ordering": true,
					        "columnDefs": [ {
						          "targets": 'no-sort',
						          "orderable": false,
						    } ],
                            "ajax": {
                                url: ADMINSITEURL+controller+"/"+function_data,
                                type: "POST"
                            }					                               
					   	 });
					swal("Changed!", "Your status has been changedsuccessfully", "success");
				 }
			 });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
}



//delete data

function delete_data_user(all,controller){

	swal({
            title: "Are you sure?",
            text: "All its subcontact will also delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm){
            if (isConfirm) {
            	var id = all.id;
	 			var post_url = controller+"/delete/"+id;
				$.ajax({
					 type: 'POST',
					 url: post_url,
					 data: {},
					 success: function(response) {
						if(response){
							$('#dashbord_tbl').DataTable().destroy();
							$('#dashbord_tbl').DataTable({
						        "processing": true,
						        "serverSide": true,
						        "ordering": true,
						        "sDom": 'Rfrtlip',
				                "columnDefs": [ {
				                      "targets": 'no-sort',
				                      "orderable": false,
				                	}],
						        "ajax": ADMINSITEURL+"administrator/users"
						   	 });
							swal("Deleted!", "Your Data has been deleted.", "success");
						}
					 }
				 });
            } else {

               return true;
            }
        });
}

function unique_data(col,val){
	if(col=="email"){
	var purl ="unique_email";
	var eid = $("#email");
	var seid = $("form-error-email")
	var msg ="This email id already exist."
	}

	if(col=="username"){
        var purl ="unique_username";
        var eid = $("#username");
        var seid = $("form-error-username")
        var msg ="This username already exist."
    }
    if(col=="useremail"){
    var purl ="unique_useremail";
    var eid = $("#email");
    var seid = $("form-error-email")
    var msg ="This email id already exist."
    }
	if(eid.val()){
	$.ajax({
			 type: 'POST',
			 url: SITEURL+"admin/administrator/"+purl,
			 data: {value:val},
			 success: function(response) {
				if(response=="1"){
					eid.val('');
					$(eid).after("<span class='form-error' style='color:red;'>"+msg+"</span>");
				}
			 }
		 });
	}
}

function unique_data_edit(col,val, id){
	if(col=="email"){
	var purl ="unique_email_edit";
	var eid = $("#email");
	var seid = $("form-error-email")
	var msg ="This email id already exist."
	}

    if(col=="useremail"){
    var purl ="unique_useremail_edit";
    var eid = $("#email");
    var seid = $("form-error-email")
    var msg ="This email id already exist."
    }

	if(col=="username"){
		var purl ="unique_username_edit";
		var eid = $("#username");
		var seid = $("form-error-username")
		var msg ="This username already exist."
	}
	if(eid.val()){
	$.ajax({
			 type: 'POST',
			 url: SITEURL+"admin/administrator/"+purl,
			 data: {value:val, id : id},
			 success: function(response) {
				 //alert(response);
				if(response=="1"){
					if(col == 'email'){
						var new_email = $("#new_email").val();
						$("#email").val(new_email);
					}else{
						var new_username = $("#new_username").val();
						$("#username").val(new_username);
					}
					$(eid).after("<span class='form-error' style='color:red;'>"+msg+"</span>");
				}
			 }
		 });
	}
}

function check_checkbox(idval,jsondata){
	console.log(JSON.parse(jsondata));
}
 function menu_active()
 {
    var url = window.location.pathname.split( '/' );
   // alert(url);
   length = url.length;
	let path = url[2];
	let link = '';
	let status = false;
        $("#side-menu > li ").find("ul li").each(function() {
		  link = $(this).find("a").attr("href");
		  let lastPartOfLink = link.substr(link.lastIndexOf("/")+1,link.length);
		if(lastPartOfLink == path && !status)
		{
			status = true;
			$(this).parent().css("display","block");
			$(this).addClass("active");
		}

	});

		}


function get_allmenu(){
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"allmenu",
			 data: {},
			 success: function(response) {
				$("#menu-item").html(response);
				menu_active();
			 }
		 });
}

//check slug
function checkslug(key,val,id_val,type){
	if(type=="edit"){
		if(val == $("#"+id_val+"_edit").val())
		return true;
	}
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"managecategory/uniquedata",
			 data: {field:key,value:val,old_slug:$('#old_slug').val()},
			 success: function(response) {
			 	if(response=="fail"){
			 		return true;
			 	}
				if(response != "success"){
					$("#"+id_val).val('');
					$("#"+id_val).after("<span class='form-error' style='color:red;'>"+response+"</span>");
				}

			 }
		 });
}

//check identifier
//check slug
function checkidentifier(key,val,id_val,type){
	if(type=="edit"){
		if(val == $("#"+id_val+"_edit").val())
		return true;
	}
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"managestaticblock/identifier",
			 data: {field:key,value:val},
			 success: function(response) {
			 	if(response=="fail"){
			 		return true;
			 	}
				if(response != "success"){
					$("#"+id_val).val('');
					$("#"+id_val).after("<span class='form-error' style='color:red;'>"+response+"</span>");
				}

			 }
		 });
}


function make_default_address(id, user_id,str){
//	alert(str);
	if($("#"+str).is(":checked")){
		//alert($("#"+str).val())
		$.ajax({
				 type: 'POST',
				 url: ADMINSITEURL+"manageaddress/make_default_address",
				 data: {id_ad : id, user_id : user_id },
				 success: function(response) {
					return true;
				 }
			 });
		 }
}
function delete_address(id){
	 swal({
            title: "Are you sure?",
            text: "All its subcontact will also delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {
                $.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"manageaddress/delete_address",
						 data: {id_ad:id},
						 success: function(response) {
							 if(response.status =="ok")	{
									$("#"+id).remove();
									swal("Deleted!", "Your Data has been deleted.", "success");
								}
						 }
					 });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
}
// delete vendor address****
function delete_vendor_address(id){
	 swal({
            title: "Are you sure?",
            text: "All its subcontact will also delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {
                $.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"managevendoraddress/delete_address",
						 data: {id_ad:id},
						 success: function(response) {
							 if(response.status =="ok")	{
									$("#"+id).remove();
									swal("Deleted!", "Your Data has been deleted.", "success");
								}
						 }
					 });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
}

/*****************get catalog input ************/
function get_catalog_input(str){
	$(".use_in_varient").hide();
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"attribute/get_catalog_input",
			 data: {key:str},
			 success: function(response) {
				 	if(str =="textarea"){
						$('#editor').show();
						}else{
							$('#editor').hide();
							}
					 $("#default_value").html(response);
					 if(str=="date"){
					 	jQuery('#datepicker-autoclose').datepicker({
					        autoclose: true,
					        todayHighlight: true
			    		});
					 }
					 if(str=="boolean"){
					 		var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch-boolean'));
					        $('.js-switch-boolean').each(function() {
					            new Switchery($(this)[0], $(this).data());
					        });
					 }
					 if(str == "multiselect"){
					 	$('.language-field .add-lan-field').click(function(){
				        	$(this).parent().find('.lag-field-wrapper').slideToggle();
				        	$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
		        		});
								$(".use_in_varient").show();
					 	add_row_multiselect();
					 }
					  if(str == "select"){
					  $('.language-field .add-lan-field').click(function(){
				        	$(this).parent().find('.lag-field-wrapper').slideToggle();
				        	$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
		        		});
								$(".use_in_varient").show();
					 	add_row_select();
					 }

			 }
		 });
}
function remove_input(obj){
    $(obj).parents('tr').remove();
}

$('#proceed_sequence').click(function(){
    proceed_sequence();

});
$('#back_sequence').click(function(){

	$(".custom-order-details-sec").remove();
    $('.back_sequence').hide();
		for(i=1;i<20;i++){
			$("#varient_attribute_start-"+i).remove();
		}
    $('.proceed_sequence').show();

});
$('.add-more-btn').click(function()
{
    $(".add-more-btn").hide(); 
   setTimeout(function() { 
    $(".add-more-btn").show(); 
  }, 500);
    proceed_sequence();

});

function proceed_sequence(){
	var res = true
	$(".error_sequence").remove();

	$(".sequence_data").each(function() {
		var text_id = this.id;
		var text = text_id.split('_');


		if($("#check_"+text[1]).is(':checked')){
			if($('#'+text_id).val()){
				if (isNaN($('#'+text_id).val())){
						$('#'+text_id).after("<span class='form-error error_sequence' style='color:red;'>Please Enter valid number</span>");
						 res =false;
					}
				}else{
					$('#'+text_id).after("<span class='form-error error_sequence' style='color:red;'>Please Enter valid number</span>");
						 res =false;
					}
			}


	});
  if($('input[name=type_varient]:checked').length<=0)
  {
    $("error_sequence_data").remove();
    $('#type_varient').after("<span class='form-error error_sequence_data' style='color:red;'>Please Choose type of varient</span>");
    res =false;
  }
	if($('.sequence_check:checked').length ==0){

		if($('.sequence_check').length>0){
			 
			$('.sequence_check:checked').focus();
			res =false;
			}else{
					// alert("In default attribute set can not create varient data");
					res =false;
				}
		}

	if(res){
		var varient_id = $(".varient_attribute_start:last").attr('id').split('-');
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/varient",
			 data: $("#add-product").serialize()+"&id_varient=" + varient_id[1],
			 success: function(response) {
				 $('.proceed_sequence').hide();
				 $('.back_sequence').show();

				  
				 $(".varient_attribute_start:last").after(response);
					//setTimeout(function(){ $(".select2").select2(); }, 3000);
				
				 
				 //validation
				 $.validate({
					 modules : 'date, security,file',
					 	onSuccess:function($form){		
					 				
					 	return checkIsValidForm();
					 }
			 });
				return true;
			 }
		 });
	 }else{
		 return false;
		 }
}

function varient_edit_data(varient_edit_data){

	$.ajax({
    	 type: 'POST',
    	 url: ADMINSITEURL+"ajax/varient_edit",
    	 data: {varient_data:varient_edit_data},
    	 success: function(response) {
    		$(".varient_attribute_start:last").after(response);
    		$.validate({
    			modules : 'date, security,file',
    			onSuccess:function($form){
    		 // return true;
    		 // alert('The form '+$form.attr('id')+' is valid!');
    			return checkIsValidForm();
    			}
    		});
    		return true;
    	}
    });
}

function csv_varient_edit_data(varient_edit_data){

	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/csv_varient_edit_data",
			 data: {varient_data:varient_edit_data},
			 success: function(response) {
				$(".varient_attribute_start:last").after(response);
				$.validate({
					modules : 'date, security,file',
					onSuccess:function($form){
				 // return true;
				 // alert('The form '+$form.attr('id')+' is valid!');
					return checkIsValidForm();
					}
				});
				return true;
			 }
		 });
}

function delete_image_varient(product_id,img,liid){

		$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/delete_image_varient",
			 data: {image:img,id_product:product_id},
			 success: function(response) {

				 $("#"+liid).remove();
				//$(".varient_attribute_start:last").after(response);
				return true;
			 }
		 });
	}

function add_row_multiselect(){

				var default_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
		        var dropown_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
		        var swatch_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
		        //alert(default_value_row);

		        //for multiple select
		        $('.multiple-select .table-add-row .add-value-row').click(function(){
		        	var sel = $('.select_data:last').attr('id');
        			var res = sel.split("_");
		        	$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"attribute/add_catalog_input",
						 data: {intype :"multiselect",num_sel : parseInt(res[1])+1},
						 success: function(response) {
						 	$('.multiple-select .table-add-row tbody').append(response);
						 	$('.language-field .add-lan-field').click(function(){
				        	$(this).parent().find('.lag-field-wrapper').slideToggle();
				        		$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
		        			});
						 }
					 });



		        	$('.multiple-select .table-add-row tbody .remove-value-row').click(function(){
			        	$(this).parents('tr').remove();
			        });
		        });
		        $('.multiple-select .table-add-row tbody .remove-value-row').click(function(){

		        	$(this).parents('tr').remove();
		        });
}
function add_row_multiselect_edit(){

				    var default_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
		        var dropown_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
		        var swatch_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
		        //alert(default_value_row);

		        //for multiple select

		        	var sel = $('.select_data:last').attr('id');
        			var res = sel.split("_");
		        	$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"attribute/add_catalog_input",
						 data: {intype :"multiselect",num_sel : parseInt(res[1])+1},
						 success: function(response) {
						 	$('.multiple-select .table-add-row tbody').append(response);
						 	$('.language-field .add-lan-field').click(function(){
				        	$(this).parent().find('.lag-field-wrapper').slideToggle();
				        		$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
		        			});
						 }
					 });



		        	$('.multiple-select .table-add-row tbody .remove-value-row').click(function(){
			        	$(this).parents('tr').remove();
			        });

		        $('.multiple-select .table-add-row tbody .remove-value-row').click(function(){

		        	$(this).parents('tr').remove();
		        });
}

function add_row_select(){
		var default_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
        var dropown_value_row = '<tr><td>#</td><td><input id="checkbox2" type="radio"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
        var swatch_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
        //alert(default_value_row);

        //for multiple select
        $('.select-dropdown .table-add-row .add-value-row').click(function(){
        	var sel = $('.select_data:last').attr('id');
        	var res = sel.split("_");

        $('#cat_id').val(res[1]);
        	$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"attribute/add_catalog_input",
						 data: {intype :"select",num_sel : parseInt(res[1])+1},
						 success: function(response) {
						 	$('.select-dropdown .table-add-row tbody').append(response);
						 	$('.select-dropdown .table-add-row tbody .remove-value-row').click(function(){
					        	$(this).parents('tr').remove();
					        });
					        $('.language-field .add-lan-field').click(function(){
				        	$(this).parent().find('.lag-field-wrapper').slideToggle();
				        		$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
		        			});
						 }
					 });


        });
        $('.select-dropdown .table-add-row tbody .remove-value-row').click(function(){
        	$(this).parents('tr').remove();
        });
}
function add_row_select_edit()
{
		var default_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';

        var dropown_value_row = '<tr><td>#</td><td><input id="checkbox2" type="radio"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';

        var swatch_value_row = '<tr><td>#</td><td><input id="checkbox2" type="checkbox"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><input type="text" id="example-text-input" value="" class="form-control"></td><td><button class="btn btn-circle text-danger remove-value-row" type="button"><i class="fa fa-trash-o"></i></button></td></tr>';
        //alert(default_value_row);

        //for multiple select

        	var sel = $('.select_data:last').attr('id');
        	var res = sel.split("_");

        $('#cat_id').val(res[1]);
        	$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"attribute/add_catalog_input",
						 data: {intype :"select",num_sel : parseInt(res[1])+1},
						 success: function(response) {
						 	$('.select-dropdown .table-add-row tbody').append(response);
						 	$('.select-dropdown .table-add-row tbody .remove-value-row').click(function(){
					        	$(this).parents('tr').remove();
					        });
					        $('.language-field .add-lan-field').click(function(){
				        	$(this).parent().find('.lag-field-wrapper').slideToggle();
				        		$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
		        			});
						 }
					 });

        $('.select-dropdown .table-add-row tbody .remove-value-row').click(function()
        {
        	$(this).parents('tr').remove();
        });
}


function setdata(id){
	$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"product/set_attribute",
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
															$.validate({
								                modules : 'date, security,file',
								                onSuccess:function($form){
								               // return true;
								               // alert('The form '+$form.attr('id')+' is valid!');
								                return checkIsValidForm();
								                }
								            });

						 }
					 });
}

//file upload
function file_upload(){
        var data = new FormData(document.getElementById("add-product"));
        var url = ADMINSITEURL+"ajax/product_image_upload";
        //var url = "http://10.0.4.21/ECOM/php/admin.php";
        $.ajax({
            type: "POST",
            url: url,
            data:  data,
            crossDomain: true,
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
                }, 1000);

            }

    });
}

//po file upload

function po_upload(){
	 	var data = new FormData(document.getElementById("update_inventory"));
		var url = ADMINSITEURL+"ajax/po_upload";
		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
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
		    	}, 1000);

		    }

	});
}

//vendor product file upload before approve
function file_upload1(){
        var data = new FormData(document.getElementById("add-product"));
        var url = ADMINSITEURL+"ajax/product_image_upload1";
        //var url = "http://10.0.4.21/ECOM/php/admin.php";
        $.ajax({
            type: "POST",
            url: url,
            data:  data,
            crossDomain: true,
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
                }, 1000);

            }

    });
}



function upload_imagegiftcategory(){
	 	var data = new FormData(document.getElementById("gift-category"));
		var url = ADMINSITEURL+"ajax/upload_giftcardcategory";
		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
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
		    	}, 1000);

		    }

	});
}

//Attachment upload
function attachment_upload(){
	 	var data = new FormData(document.getElementById("composeMsgForm"));
		var url = ADMINSITEURL+"ajax/attach_image_upload";
		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
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
		        	$("#attach_all_img").html(response);
		        	$("#loading-image").hide();
		    	}, 1000);

		    }

	});
}


//Notification upload
function notification_upload(){
    var data = new FormData(document.getElementById("postNotificationForm"));
    var url = ADMINSITEURL+"ajax/notification_image_upload";
    //var url = "http://10.0.4.21/ECOM/php/admin.php";
    $.ajax({
        type: "POST",
        url: url,
        data:  data,
        crossDomain: true,
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
              $("#attach_all_img").html(response);
              $("#loading-image").hide();
          }, 1000);

        }

  });
}

//change favourite
function changefavStatus(rowid,status){
//alert('test');
	$.ajax({
		 type: 'POST',
		 url: ADMINSITEURL+"managemessage/change_fav_status",
		 data: {id:rowid, st:status},
		 success: function(response) {
			$("#fav_"+rowid).html(response);
			//$('td').eq(1).html(response);
			//location.reload();
		 }
	 });
}

//file upload for onsell product
function file_uploadonsell(){
	 	var data = new FormData(document.getElementById("onsell_product_add"));
		var url = ADMINSITEURL+"ajax/onsellproduct_image_upload";
		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
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
		    	}, 7000);

		    }

	});
}

function file_uploadonsell_banner(){
	 	var data = new FormData(document.getElementById("onsell_product_add"));
		var url = ADMINSITEURL+"ajax/onsellproduct_image_upload_banner";
		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading-image_banner").show();
           },
		    success: function(response)
		    {
		    	setTimeout(function() {
		        	$("#default_all_img_banner").html(response);
		        	$("#loading-image_banner").hide();
		    	}, 7000);

		    }

	});
}

//upload varient file
function upload_varient_file(id_varient){
    var file_data = $('#product_image_'+id_varient).prop('files');
    var form_data = new FormData();
        for(var i=0;i<file_data.length;i++){
            form_data.append('file', file_data[i]);
        }
        form_data.append('id', id_varient);
        var url = ADMINSITEURL+"ajax/upload_varient_file/?id_data="+id_varient;
        $("#loading-image-"+id_varient).show();
        $.ajax({
        url: url, // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            $("#preview_image-"+id_varient).html(response);
            $("#loading-image-"+id_varient).hide();// display response from the PHP script, if any
        },

        complete: function(){
        $("#loading-image-"+id_varient).hide();
        }

    });
	/*	var data = new FormData(document.getElementById("add-product"));
		var url = ADMINSITEURL+"ajax/upload_varient_file/"+id_varient;
		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading-image-"+id_varient).show();
           },
		    success: function(response)
		    {
		    	setTimeout(function() {
		        	$("#preview_image-"+id_varient).html(response);
		        	$("#loading-image-"+id_varient).hide();
		    	}, 5000);

		    }

	});*/
	}

	function upload_varient_file_data(id_varient){
		var url = ADMINSITEURL+"ajax/upload_bulk_varient_file/"+id_varient;
		var file_data = $('#product_image_'+id_varient).prop('files');
	    var form_data = new FormData();
			for(var i=0;i<file_data.length;i++){
				form_data.append('file', file_data[i]);
			}
		$.ajax({
        url: url, // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
				beforeSend: function() {
							$("#loading-image-"+id_varient).show();
					 },
        success: function(response){
					setTimeout(function() {
					$("#preview_image-"+id_varient).html(response);
					$("#loading-image-"+id_varient).hide();
				},1000)
        }
     });

	}


//reject status***********************
function reject(id){
    var str =  $(textarea).val();
    var vendor_name =$("#vendor_name").val();
    var vendor_email =$("#vendor_email").val();
		if(str==""){
			$(".reject-error").hide();
			$("#textarea").after("<span class='form-error reject-error' style='color:red;'>Please insert reason for reject</span>");
			return false;
		}else{
      $.ajax({

             type: 'POST',
             url: ADMINSITEURL+"vendor/reject_status",
             data: {st:str,id:id,ven_name:vendor_name,ven_email:vendor_email},
						 async:false,
             success: function(response) {
                $('#test-form').css({'display':'none'});
                $('.mfp-ready').removeClass('mfp-bg');
                window.location.href=ADMINSITEURL+"vendor/view_vendor/"+id;
             }
         })
			 }
    }

//upload image***********************
function upload_image(path,field_name,formid){
	 	var data = new FormData(document.getElementById(formid));
	 	data.append('field',field_name);
	 	data.append('path',path);
		var url = ADMINSITEURL+"ajax/upload_image";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading-"+field_name).show();
           },
		    success: function(response)
		    {
		      $("#loading-"+field_name).hide();
		      $("#"+field_name+"_text").val(response);
		      $("#att_img").attr('src','/files/attachments/'+response);
		    }

	});
}

//upload image***********************
function upload_image_gift_category(path,field_name,formid){
	 	var data = new FormData(document.getElementById(formid));
	 	data.append('field',field_name);
	 	data.append('path',path);
		var url = ADMINSITEURL+"ajax/upload_giftcard_category";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading-"+field_name).show();
           },
		    success: function(response)
		    {
		      $("#loading-"+field_name).hide();
		      $("#"+field_name+"_text").val(response);
		      $("#att_img").attr('src','/files/attachments/'+response);
		    }

	});
}

function brand_upload_logo(id){
		var id_field = "fileinput"+id;
		var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/brand_upload_logo', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
						 	$("#dvPreview1_"+id).show();
							$("#my_logo_"+id).attr("src","/files/brand/logo/original/"+response);
							$("#logo_"+id).val(response);
							$(".delete_logo_new").show();
        }
     });
}

function brand_upload_banner(id){
		var id_field = "fileupload"+id;
		var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/brand_upload_banner', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
						 	$("#dvPreview_"+id).show();
							$("#my_banner_"+id).attr("src","/files/brand/banner/original/"+response);
							$("#banner_"+id).val(response);
							$(".delete_banner_new").show();
        }
     });
}

function category_icon_upload(id){
    var id_field = "fileupload"+id;
    var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/category_icon_upload', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
            $("#dvPreview_"+id).show();
            $("#my_category_"+id).attr("src","/files/categories/"+response);
            $("#category_icon").val(response);
        }
     });
}


function testimonial_image(id){
        var id_field = "fileupload"+id;
        var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/testimonial_image', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
            $("#dvPreview_"+id).show();
            $("#my_banner_"+id).attr("src","/files/testimonial/original/"+response);
            $("#banner_"+id).val(response);
            $(".delete_banner_new").show();
        }
     });
}

function upload_giftcard_category(id){
		var id_field = "fileupload"+id;
		var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/upload_giftcard_category', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
						 	$("#dvPreview_"+id).show();
							$("#my_banner_"+id).attr("src","/files/gift/category/original/"+response);
							$("#banner_"+id).val(response);
							$(".delete_banner_new").show();
        }
     });
}

function upload_giftcard(id){
        var id_field = "fileupload"+id;
        var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/upload_giftcard', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
            $("#dvPreview_"+id).show();
            $("#my_banner_"+id).attr("src","/files/gift/giftcard/original/"+response);
            $("#banner_"+id).val(response);
            $(".delete_banner_new").show();
        }
     });
}

function upload_blog(id){
		var id_field = "fileupload"+id;
		var file_data = $('#'+id_field).prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: '/admin/ajax/upload_blog', // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
             // display response from the PHP script, if any"
		 	$("#dvPreview_"+id).show();
			$("#my_blog_"+id).attr("src","/files/blog/original/"+response);
			$("#blog_"+id).val(response);
			$(".delete_blog_new").show();
        }
     });
}

function upload_reject_image(path,field_name,formid){
	var file_data = $('#attach_reject_file').prop('files')[0];
    var form_data = new FormData();
    var csv = $('#attach_reject_file').val();
    var file = csv.match(/\\([^\\]+)$/)[1];
    form_data.append('file', file_data);
    $.ajax({
        url: ADMINSITEURL+"ajax/upload_reject_image", // point to server-side PHP script
        dataType: 'text',  // what to expect back from the PHP script, if anything
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',

        success: function(response){        	
          $("#loading-"+field_name).hide();
	      $("#"+field_name+"_text").val(response);
	      $("#csv_name").html(file);
	      $("#att_img").attr('src','/files/attachments/'+response);
        }
     });
}

function upload_single_image(event,path,field_name,formid){

	var data = new FormData(document.getElementById(formid));
	data.append('field',field_name);
	data.append('path',path);
	var url = ADMINSITEURL+"ajax/upload_single_image";
	$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading_image").show();
           },
		    success: function(response)
		    {
		    	setTimeout(function() {
			    	var img = "/files/logo/original/"+response;
			    	$("#"+field_name).val(response);
			    	$("#preview_image").html('<img src="'+URL.createObjectURL(event.target.files[0])+'" width="100" heigth="100">')
			    	$("#loading_image").hide();
			    }, 1000);

		    }
		});
}
// currency page*******************
function getSymbol(){
	 var code = document.getElementById("code_value").value;
	 //alert(code);
	 $.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"managecurrency/symbols",
			 data: {code:code},
			 success: function(response) {
				 if(response.status =="ok")	{
					 $("#symbol").val(response.data);
					}
			 }
			});
}
//checck unique attribute
function check_unique_attr(str){

	$.ajax({
		 type: 'POST',
		 url: ADMINSITEURL+"ajax/check_unique_attr",
		 data: {code:str},
		 success: function(response) {
			// console.log(response);
			 if(response.status =="fail")	{
				 $("#att_code_error").show();
				 $("#attribute_code").val('');
				}
			else{
				$("#att_code_error").hide();
			}
		 }
	});
}
function get_state_old(str,select){
  $.ajax({
     type: 'POST',
     url: ADMINSITEURL+"ajax/get_state",
     data: {cid:str,select:select},
     success: function(response) {
       $("#state").html(response);
     }
  });

}

function get_state(str_val,state_val){
    //alert(str_val);
	$.ajax({
		type : 'POST',
		url :  ADMINSITEURL+"ajax/get_state",
		data : { country_id : str_val, state:state_val},
		success : function(response){
			$("#state").html(response);
		}
	});
}

function get_shipping_state(str_val,state_val){
	$.ajax({
		type : 'POST',
		url :  ADMINSITEURL+"ajax/get_state",
		data : { country_id : str_val, state:state_val},
		success : function(response){
			$("#shipping_state").html(response);
		}
	});
}

function get_business_state(str_val,state_val){
	$.ajax({
		type : 'POST',
		url :  ADMINSITEURL+"ajax/get_state",
		data : { country_id : str_val, state:state_val},
		success : function(response){
			$("#business_state").html(response);
		}
	});
}
function get_residential_state(str_val,state_val){
	$.ajax({
		type : 'POST',
		url :  ADMINSITEURL+"ajax/get_state",
		data : { country_id : str_val, state:state_val},
		success : function(response){
			$("#residential_state").html(response);
		}
	});
}

function get_trading_state(str_val,state_val){
	$.ajax({
		type : 'POST',
		url :  ADMINSITEURL+"ajax/get_state",
		data : { country_id : str_val, state:state_val},
		success : function(response){
			$("#trading_state").html(response);
		}
	});
}

function get_newsletter_template(groupid){

    $('#template_name').html("");
    $('#template_content').html("");
    $('#tempcontent').hide();
    $.ajax({
      type: "POST",
      url: "/admin/sendnewsletter/get_template",
      data: {
        tmpgroup_id: groupid
      },
      success: function(data) {
      	//console.log(data);
        var toAppend = '';
        if (data != '0') {
          toAppend += '<option value = "">Please Select</option>';
          for (var i = 0; i < data.length; i++) {
            toAppend += '<option value= ' + data[i]['id'] + '>' + data[i]['templatename'] + '</option>';
          }
        } else {
          toAppend += '<option value = "">Please Select</option>';
        }
        $('#template_name').html(toAppend);
      }
    });

}


function get_temp_content(tempid){

	$('#template_content').html("");
    $.ajax({
      type: "POST",
      url: "/admin/sendnewsletter/get_template_content",
      data: {
        temp_id: tempid
      },
      success: function(data) {
      	//console.log(data);
      	if (data!= '0') {

      		$('.ckedit').html(data);
      		$('#tempcontent').show();
      		tinymce.remove();
			/*tinymce.init();*/
			    tinymce.init({
                    selector: "textarea.mymce",
                    theme: "modern",
                    height: 200,
                    apply_source_formatting : false,
                    valid_elements : '*[*]',
                    plugins: [
                        "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                        "save table contextmenu directionality emoticons template paste textcolor"
                    ],
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",

                });

      	}else{
      		$('#tempcontent').hide();
      	}

      }
    });

}

function email_server_section(){
	//$("#emailserver").on("change", function() {
    var emailserver = $("#emailserver").val();
    if (emailserver == 'SMTP') {
      $('#emailserver_label').show();
      $(".serv-valid").attr("data-validation", "required");
    }else {
      $('#emailserver_label').hide();
      $(".serv-valid").removeAttr("data-validation");
    }
  //});
}



function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
}

function createPdf(divName) {
     $.ajax({
			 type : 'POST',
			 url : ADMINSITEURL+"manageorder/create_pdf",
			 success : function(response){
				 alert("pdf created successfully");
			 }
		 });
}

function block_user(user_id,status){
  $.ajax({
    type: 'POST',
    url: ADMINSITEURL+"user_info/block_user",
    data: {id:user_id, st:status},
    success: function(response) {
      $("#block_user").html(response);
    }
  });
}

function changeorderStatus(rowid,status,controller){
	if(status =="5a2663c307ba6f72c67a650a"){
		$("#form_id").val(rowid);
		$("#orderstatus").val(status);
		$("#responsive-modal").addClass('show');
	}
	else{
	swal({
            title: "Are you sure?",
            text: "To change status ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {$.ajax({
				 type: 'POST',
				 url: ADMINSITEURL+controller+"/change_order_status",
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
}

function delete_review_rating(url){

	swal({
            title: "Are you sure?",
            text: "All its subcontact will also delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {
            	window.location=url;
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
}

//file upload csv product
//file upload
function file_upload_csv(){
	 	var data = new FormData(document.getElementById("bulk_upload"));
		var url = ADMINSITEURL+"ajax/bulk_upload_product_csv";

		var csv = $('#csv').val();
       var file = csv.match(/\\([^\\]+)$/)[1];

		//var url = "http://10.0.4.21/ECOM/php/admin.php";
		$.ajax({
		    type: "POST",
		    url: url,
		    data:  data,
		    crossDomain: true,
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
		    contentType: false,   // tell jQuery not to set contentType
		    dataType: "text",
		    beforeSend: function() {
              $("#loading-image").show();
           },
		    success: function(response)
		    {
	        	$("#csv_text").val(response)
	        	$("#csv_name").html(file)
	        	$("#loading-image").hide();
		    }

	});
}
function change_cancel_order_status(status_val,all){
	var controller = "cancel_order";
	var function_name = "all_order";
	 swal({
	             title: "Are you sure?",
	             text: "to change status ?",
	             type: "warning",
	             showCancelButton: true,
	             confirmButtonColor: "#DD6B55",
	             confirmButtonText: "Yes, change it!",
	             cancelButtonText: "No, cancel",
	             closeOnConfirm: false,
                 showLoaderOnConfirm: true,
	             closeOnCancel: false
	         }, function(isConfirm){
	             if (isConfirm) {
								 			var id_val = all.id;
								 			var id_data = id_val.split('_');
	                      var post_url =ADMINSITEURL+"cancel_order/change_cancel_status";
												$.ajax({
													 type: 'POST',
													 url: ADMINSITEURL+"cancel_order/change_cancel_status",
													 data: {cancel_status:status_val, cancel_id:id_data[2]},
													 success: function(response) {
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
																	 "ajax": ADMINSITEURL+controller+'/'+function_name
																});
															 swal("Changes!", "Status has been changed.", "success");
													 }
												 });
	             } else {
	                 swal("Cancelled", "Your data is safe :)", "error");
	             }
	         });


}

function file_upload_product(){
	var data = new FormData(document.getElementById("bulk_upload"));
	var url = ADMINSITEURL+"ajax/bulk_upload_product_zip";
	 var csv = $('#zip').val();
       var file = csv.match(/\\([^\\]+)$/)[1];
	$.ajax({
			type: "POST",
			url: url,
			data:  data,
			crossDomain: true,
			enctype: 'multipart/form-data',
			processData: false,  // tell jQuery not to process the data
			contentType: false,   // tell jQuery not to set contentType
			dataType: "text",
			async:false,
			beforeSend: function() {
						$("#loading-image-product").show();
				 },
			success: function(response)
			{
						$("#product_text").val(response)
						$("#prod_name").html(file)
						$("#loading-image-product").hide();
			}

});

}

function get_courier_service(courier_id){
	 $.ajax({
			 type : 'POST',
			 url : ADMINSITEURL+"shipingmanage/get_courier_service",
			 data:{courier_id:courier_id},
			 success : function(response){

				$("#courier_service_id").html(response);
			 }
		 });

}

function get_vendor_brand(vendor_id){
	 $.ajax({
			 type : 'POST',
			 url : ADMINSITEURL+"brand/get_vendor_brand",
			 data:{ vendor_id : vendor_id },
			 success : function(response){
				$("#brand").html(response);
			 }
		 });

}

function get_min_max_day(courier_service_id){
	$.ajax({
			 type : 'POST',
			 url : ADMINSITEURL+"shipingmanage/get_min_max_day",
			 data:{courier_service_id:courier_service_id},
			 success : function(response){
					$("#min_day").val(response.min_day?response.min_day:0);
					$("#max_day").val(response.max_day?response.max_day:0);
			 }
		 });

}

//for product and school product check preorder validation
function validate_form(){ 
    var start_date = $("#order_date").val();
    var end_date = $("#end_date").val();
    var launch_date = $("#launch_date").val();
    var st=0
    $(".err-data-coupon").hide();
    if(Date.parse(end_date) < Date.parse(start_date)){
      $("#end_date").after('<span class="err-data-coupon">Please Enter greater than or equal to order date</span>');
      st=1;
    }

    if(Date.parse(launch_date) < Date.parse(end_date)){
      $("#launch_date").after('<span class="err-data-coupon text-danger">Please Enter greater than or equal to end date</span>');
      st=1;
    }

    if(st==1){
    return false;
    }else{
    return true;
    }
  }


 $(document).ready(function(){
	 $( "#dsku" ).blur(function() {
		  $.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"ajax/unique_sku",
			 data: {st:$("#sku").val(),pid:$("#id").val()},
			 success: function(response) {
			 	if(!response.status){
			 		//$("#sku").val('');
			 		//$("#sku").after("<span class='form-error' style='color:red;'>"+response.message+"</span>");
			 	}

			 }
		 })
		});

	 $('.language-field .add-lan-field').click(function(){
		$(this).parent().find('.lag-field-wrapper').slideToggle();
		$(this).parents('td').siblings().find('.lag-field-wrapper').slideToggle();
	 });
	get_allmenu();

	$("#forgot").click(function(){
		var post_url = ADMINSITEURL+"forgot";
		$.ajax({
			 type: 'POST',
			 url: post_url,
			 data: $('#recoverform').serialize(),
			 success: function(response) {
				if(response=="success"){
						$('#success').html("Password has been sent to your email id!.")
					}
				if(response=="fail"){
						$('#fail').html("Email does not exist");
					}
			 }
		 });
	});

	// paging nation and searching serverside datatable
	$('#dashbord_tbl').DataTable({
        "processing": true,
    	"serverSide": true,
    	"ordering": true,
    	"sDom": 'Rfrtlip',
        "columnDefs": [ {
              "targets": 'no-sort',
              "orderable": false,
							"lengthChange":false
        	}],
        "ajax": {
        	url: ADMINSITEURL+"administrator/users",
					data:{"name":$("#pname").val(),
                "email":$("#pemail").val(),
                "username":$("#user_name").val(),
                "role":$("#prole").val(),
                "status":$("#pstatus").val(),
                "block":$("#pblock").val()
              },
        	type: "POST"
        }
   	});

   	$( "#all_check" ).change(function() {
  		if($("#all_check").is(":checked")){
  			$(".all_check").prop("checked", true);
  		}else{
  			$(".all_check").prop("checked", false);
  		}
	});

	

	$( "#action_submit" ).click(function() {

	  var action_name = $("#action_change").val();
      if($('.all_check:checked').length==0){
        alert("Please select record");
        return false;
      }
      if($('#action_change').val()==""){
        alert("Please select Action");
        return false;
      }
  		var controller = $("#cont").val();
  		var function_data = $("#fun").val();
  		var tbl = $("#cont").val();
  		if(controller=="administrator"){
  			var tbl = "dashbord";
  		}
  		if(action_name == '2') {
					  swal({
            title: "Are you sure?",
            text: "All its subcontact will also delete ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {
            $.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+controller+"/change_all_status",
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
                            "ajax": {
                                url: ADMINSITEURL+controller+"/"+function_data,
                                type: "POST"
                            } 
					   	 });
                   swal("Deleted!", "Your Data has been deleted.", "success");
				$("#all_check").prop("checked", false);
				//location.reload();
			 }
		 });

            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
			}else if(action_name == '5'){
				$.ajax({
					 type: 'POST',
					 url: ADMINSITEURL+"vendorrequest/status_approved_all",
					 data: $("#tbl_form").serialize(),
					 success: function(response) {
					 	if(response.status){
					 		window.location.href=response.nextURL;
					   }
					}
				 })
			}
			else if(action_name == '7'){
				$.ajax({
					 type: 'POST',
					 url: ADMINSITEURL+"vendorpartial/status_partialapproved_all",
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
                                    "ajax": {
                                        url: ADMINSITEURL+controller+"/"+function_data,
                                        type: "POST"
                                    }
							   	 });

						$("#all_check").prop("checked", false);
						//location.reload();
					 }
				 })
			}else if(action_name == 'vendor_approve'){
        
        $.ajax({
					 type: 'POST',
					 url: ADMINSITEURL+"vendor/approveAll",
					 data: $("#tbl_form").serialize(),					 
				 	success: function(response) {
             console.log(response)
            $('#vendorRequestTable').DataTable().destroy();
            $('#vendorRequestTable').DataTable({
              "processing": true,
                "serverSide": true,
                "order": [[ 5, "desc" ]],
                "columns": [
                  { "name": "checkboxes","orderable": false  },
                  { "name": "name" },
                  { "name": "email" },
                  { "name": "mobile" },
                  { "name": "vendor.organisation" },
                  { "name": "vendor.request_date" },
                  { "name": "action","orderable": false },
      
                ],
              "ajax": {
                url : ADMINSITEURL+'vendor/request',
                type : "POST"
              }
          });

						$("#all_check").prop("checked", false);
						//location.reload();
					 }
				 })
			}
		else{
  		$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+controller+"/change_all_status",
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
                            "ajax": {
                                url: ADMINSITEURL+controller+"/"+function_data,
                                type: "POST"
                            }
					   	 });

				$("#all_check").prop("checked", false);
				//location.reload();
			 }
		 });
	  }
   	});

   	// check track code..............

   	$(".product_tracking_code").on("click", function(){
        var rowid = $("#product_form_id").val();
		var vendorid = $("#vendorid").val();
		var track_code = $("#track_code_product").val();
		var orderstatus = $("#product_orderstatus").val();
		var product_id = $("#product_id").val();
		var shiping_code = $("#ordershiping_type").val();
		var type = $("#type").val();
		swal({
			 title: "Are you sure, to change product status?",
			 text: "Product status has been changed?",
			 type: "warning",
			 showCancelButton: true,
			 confirmButtonColor: "#DD6B55",
			 confirmButtonText: "Yes, change it!",
			 cancelButtonText: "No, Cancel",
			 closeOnConfirm: false,
             showLoaderOnConfirm: true,
			 closeOnCancel: false
		}, function(isConfirm){
			if (isConfirm) {
				$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"manageorder/save_product_track_code",
						 data: { id : rowid, track_code :track_code, orderstatus : orderstatus, product_id : product_id, shiping_code : shiping_code,vendor_id:vendorid},
						 success: function(response) {
							if(response =="success"){

								$("#orderresponsive-modal").removeClass('show');
								swal("Changed!", "Your Tracking code save successfully", "success");
								window.location.reload();
							}else{
									swal("Cancelled", "This tracking code is already exits :", "error");
									//window.location.reload();
								//swal("Changed!", "", "success");
							}

						 }
					});
				}
				else{
					swal("Cancelled", "Your data is safe :)", "error");
				}

			});
	});

   	$(".trackcode_id").on("click", function(){
		var rowid = $("#form_id").val();
		var track_code = $("#track_code").val();
		var orderstatus = $("#orderstatus").val();
		var shiping_code = $("#shiping_type").val();
		var type = $("#type").val();
		if(type =="view"){
			swal({
			 title: "Are you sure, to change all product status, which is involved in this order id?",
			 text: "All Product status has been changed?",
			 type: "warning",
			 showCancelButton: true,
			 confirmButtonColor: "#DD6B55",
			 confirmButtonText: "Yes, change it!",
			 cancelButtonText: "No, Cancel",
			 closeOnConfirm: false,
             showLoaderOnConfirm: true,
			 closeOnCancel: false
		}, function(isConfirm){
			if (isConfirm) {
				$.ajax({
					 type: 'POST',
						url: ADMINSITEURL+"manageorder/save_track_code",
					 data: { id : rowid, track_code :track_code, orderstatus : orderstatus, shiping_code : shiping_code },
					 success: function(response) {
						if(response =="success"){
							swal("Changed!", "Your Tracking code save successfully", "success");
						}else{
								 $('#order_tbl').DataTable().destroy();
									$('#order_tbl').DataTable({
												"processing": true,
												"serverSide": true,
												"ordering": true,
												"columnDefs": [ {
														"targets": 'no-sort',
														"orderable": false,
											} ],
												"ajax": ADMINSITEURL+"manageorder/all_order"
										 });
								swal("Cancelled", "This tracking code is already exits :", "error");
							//swal("Changed!", "", "success");
						}

					 }
				});
			}
			else{
					swal("Cancelled", "Your data is safe :)", "error");
			}
			});
		}
		else{
			swal({
			 title: "Are you sure, to change all product status, which is involved in this order id?",
			 text: "All Product status has been changed?",
			 type: "warning",
			 showCancelButton: true,
			 confirmButtonColor: "#DD6B55",
			 confirmButtonText: "Yes, change it!",
			 cancelButtonText: "No, Cancel",
			 closeOnConfirm: false,
             showLoaderOnConfirm: true,
			 closeOnCancel: false
		}, function(isConfirm){
			if (isConfirm) {
				$.ajax({
					 type: 'POST',
					 url: ADMINSITEURL+"manageorder/save_track_code",
					 data: { id : rowid, track_code :track_code, orderstatus : orderstatus, shiping_code : shiping_code },
					 success: function(response) {
						if(response =="success"){
							swal("Changed!", "Your Tracking code save successfully", "success");
							window.location.reload();
						}else{
								swal("Cancelled", "This tracking code is already exits :", "error");
								//window.location.reload();
							//swal("Changed!", "", "success");
						}

					 }
				});
			  }
			  else{
					swal("Cancelled", "Your data is safe :)", "error");
			}
			});
		}
	});

   	//get language detail

   $( "#lang_name" ).change(function(){
   		var post_url = ADMINSITEURL+"ajax/alllanguage";
		$.ajax({
			 type: 'POST',
			 url: post_url,
			 data: {id:$(this).val()},
			 success: function(response) {
				$("#lang_code").val(response.code2l);
				var img = "/files/languages/"+response.flag_128;
				$("#lang_image").html('<img src="'+img+'">');

			 }
		 });
   });



  /// Attribute multiselect
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
		        $('.js-switch').each(function() {
		            new Switchery($(this)[0], $(this).data());
		        });

		        // Date Picker
			    jQuery('.mydatepicker, #datepicker').datepicker();
			    jQuery('#datepicker-autoclose').datepicker({
			        autoclose: true,
			        todayHighlight: true
			    });


});

$(window).load(function(){
	// category listing in coupon page
	var cat_dis = $("#cat_discount").val();
	if(cat_dis == "yes"){
		$("#category_list").css("display", "block");
	}
	else{
		$("#category_list").css("display", "none");
	}

	var product_discount = $("#product_discount").val();
	if(product_discount == "yes"){
		$(".product_list").css("display", "block");
	}
	else{
		$(".product_list").css("display", "none");
	}
	//category menu listing js
	// edit page vendor show and hide
	var vendor_discount = $("#vendor_discount").val();
	if(vendor_discount == "yes"){
		$(".vendor_list").css("display", "block");
	}
	else{
		$(".vendor_list").css("display", "none");
	}
	setTimeout(function(){
		$('#nestable .dd-item').has("ol").addClass('have-menu');
	},1000);

	// edit page vendor show and hide
	/*setTimeout(function(){
	$('#nestable .dd-item').has("ol").addClass('have-menu');
	$('.dd').on('change', function() {
	    
	   $('#nestable .dd-item').has("ol").addClass('have-menu');
	   $('#nestable :not(:contains(ol))').removeClass('have-menu');
	});
       $('.have-menu').prepend("<button data-action='collapse' type='button' style='display: none;'>Collapse</button><button data-action='expand' type='button' style='display: block;'>Expand</button>");
	},500);*/
	
	/*$('#nestable .dd-item').has("ol").addClass('have-menu');
	$('.dd').on('change', function() {
	    /* on change event */
	/*   $('#nestable .dd-item').has("ol").addClass('have-menu');
	   $('#nestable :not(:contains(ol))').removeClass('have-menu');
	});
	$('.have-menu').prepend("<button data-action='collapse' type='button' style='display: none;'>Collapse</button><button data-action='expand' type='button' style='display: block;'>Expand</button>");
	*/
	//$('#nestable').nestable('collapseAll');

});

function changeshipingstatus(id, order_detail_id){
	//alert(product_name);
	var status = id.value;

	var rowid = order_detail_id;
    

	if(status =="5a2663c307ba6f72c67a650a"){
		$("#product_form_id").val(rowid);
		$("#product_orderstatus").val(status);
		$("#product_id").val(product_id);
		$("#orderresponsive-modalsymbol_left").addClass('show');
	}else{
		swal({
            title: "Are you sure?",
            text: "To change status ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {$.ajax({
				 type: 'POST',
				 url: ADMINSITEURL+"manageorder/change_product_order_status",
				 data: { id : rowid, st : status},
				 success: function(response) {

					$("#status_"+rowid).html(response);
					swal("Changed!", "Your status has been changed successfully", "success");
					$("#orderresponsive-modalsymbol_left").hide();
					location.reload();
				 }
			 });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
                location.reload();
            }
        });
	}
}

function changeshipingstatus_orderwise(id, order_detail_id,vendorid){
    //alert(product_name);
    var status = id.value;
   // alert(status);
    var rowid = order_detail_id;
    var vendor_id=vendorid;

   /* if(status =="5a2663c307ba6f72c67a650a"){
        $("#product_form_id").val(rowid);
        $("#product_orderstatus").val(status);
        $("#product_id").val(product_id);
        $("#orderresponsive-modalsymbol_left").addClass('show');
        
    }else{*/
        swal({
            title: "Are you sure?",
            text: "To change status ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: false
        }, function(isConfirm){
            if (isConfirm) {               
                if(status =="5a97c46a8492183773c6ded4"){
                    if(trackcodestatus()=='fails'){
                        location.reload();
                    }else{
                         $.ajax({
                             type: 'POST',
                             url: ADMINSITEURL+"manageorder/change_vendorproduct_order_status",
                             data: { order_id : rowid, st : status,vendor_id:vendor_id},
                             success: function(response){
                                $("#status_"+rowid).html(response);
                                swal("Changed!", "Your status has been changed successfully", "success");
                                $("#orderresponsive-modalsymbol_left").hide();
                                location.reload();
                             }
                         });
                    }
                }else{
                    $.ajax({
                     type: 'POST',
                     url: ADMINSITEURL+"manageorder/change_vendorproduct_order_status",
                     data: { order_id : rowid, st : status,vendor_id:vendor_id},
                     success: function(response){
                        $("#status_"+rowid).html(response);
                        swal("Changed!", "Your status has been changed successfully", "success");
                        $("#orderresponsive-modalsymbol_left").hide();
                        location.reload();
                     }
                 });
              }               

            } else {
                swal("Cancelled", "Your data is safe :)", "error");
                location.reload();
            }
        });
   // }
}
function trackcodestatus()
{
	    var rowid = $("#product_form_id").val();
		var vendorid = $("#vendorid").val();
		var track_code = $("#track_code_product").val();
		//var orderstatus = $("#product_orderstatus").val();
        var orderstatus = $("#change_order_status").val();
		var product_id = $("#product_id").val();
		var shiping_code = $("#ordershiping_type").val();
        //alert(rowid);
		var type = $("#type").val();
		$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"manageorder/save_product_track_code",
			 data: { id : rowid, track_code :track_code, orderstatus : orderstatus, product_id : product_id, shiping_code : shiping_code,vendor_id:vendorid},
			 async: false,
             success: function(response) {
				return(response)//window.location.reload();
			 }
		});
}
function changeshipedstatus(id, order_detail_id,vendorid)
{
    var status = id.value;

    var rowid = order_detail_id;
    var vendor_id=vendorid;
    var odstatus = $("#odstatus").val();
   /* if(status =="5a2663c307ba6f72c67a650a"){
        $("#product_form_id").val(rowid);
        $("#product_orderstatus").val(status);
        $("#product_id").val(product_id);
        $("#orderresponsive-modalsymbol_left").addClass('show');
    }else{*/
        swal({
            title: "Are you sure?",
            text: "To change status ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            closeOnCancel: false,            
            showLoaderOnConfirm: true,
        }, function(isConfirm){
            if (isConfirm) {$.ajax({
                 type: 'POST',
                 url: ADMINSITEURL+"manageorder/changeshipedstatus",
                 data: { order_id : rowid, st : status,vendor_id:vendor_id,odstatus:odstatus},
                 success: function(response) {

                    $("#status_"+rowid).html(response);
                    swal("Changed!", "Your status has been changed successfully", "success");
                   // $("#orderresponsive-modalsymbol_left").hide();
                    location.reload();
                 }
             });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
                location.reload();
            }
        });
    //}
}





function generate_order_invoice(id_data){

	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"manageorder/invoice/"+id_data,
			 data: {id_data:id_data},
			 success: function(response) {
				 if(response){
					 	create_invoice_pdf(response, id_data);
				 }else{
					 alert('This invoice not generate beacause all products has Cancelled or refund');
				 }
			 }
		 })
}

function create_invoice_pdf(response, id_data){
	$.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+"manageorder/invoice_pdf",
			 data: {res_data:response,id:id_data},
			 success: function(response) {
				if(response){
					window.open(response, '_blank');
					//window.location =response;
				}else{
					alert("Something is missing");
				}
				//window.location.href = response;

			 }
		 })
}

function close_alert_tab(){

	    setTimeout(function() {
	        $(".alert").alert('close');
	    }, 5000);
}


function onclick_option_tab(){

	$('.co-opp').click(function() {
		$('.indi-form').slideUp(500);
		$('.co-form').slideDown(500);
		$(".comp-valid").attr("data-validation","required");
		$(".indi-valid").removeAttr("data-validation");
	});

	$('.indi-opp').click(function() {
		$('.indi-form').slideDown(500);
		$('.co-form').slideUp(500);
		$(".indi-valid").attr("data-validation","required");
		$(".comp-valid").removeAttr("data-validation");
	});

	$('.tax-no-opp').click(function() {
		$('.indi-form-tax').slideUp(500);
		$('.co-form-tax').slideDown(500);
		$(".tax-valid").removeAttr("data-validation");

	});

	$('.tax-opp').click(function() {
		$('.indi-form-tax').slideDown(500);
		$('.co-form-tax').slideUp(500);
		$(".tax-valid").attr("data-validation","required");
	});

	$('.stripe-opp').click(function() {

		$('.bank-form').slideUp(500);
		$('.paypal-form').slideUp(500);
		$('.stripe-form').slideDown(500);
		$(".bank-valid").removeAttr("data-validation");
		$(".paypal-valid").removeAttr("data-validation");
		$(".stripe-valid").attr("data-validation","email,required");

	});

	$('.paypal-opp').click(function() {

		$('.bank-form').slideUp(500);
		$('.paypal-form').slideDown(500);
		$('.stripe-form').slideUp(500);
		$(".bank-valid").removeAttr("data-validation");
		$(".paypal-valid").attr("data-validation","email,required");
		$(".stripe-valid").removeAttr("data-validation");
	});

	$('.bank-opp').click(function() {
		$('.bank-form').slideDown(500);
		$('.paypal-form').slideUp(500);
		$('.stripe-form').slideUp(500);
		$(".bank-valid").attr("data-validation","required");
		$(".paypal-valid").removeAttr("data-validation");
		$(".stripe-valid").removeAttr("data-validation");
	});
}


function profile_settion(str){

	if(str =="company"){
        //$("#elementId").css({ 'display': "block" });
		$('.indi-form').css({ 'display': "none" });
		$('.co-form').css({ 'display': "block" });
	}

	if(str =="individual"){
		$('.indi-form').css({ 'display': "block" });
		$('.co-form').css({ 'display': "none" });
	}
}


function trading_check(str){
		if(str =="1"){
			$('#trad-block').css({ 'display': "none" });
		}else{
			$('#trad-block').css({ 'display': "block" });
		}
}

function trading_section_change(){

	    if ($("#trading_check").is(':checked')){

			$(".trading").removeAttr("data-validation");
			$('#trad-block').css({ 'display': "none" });

		}else{

			$(".trading").attr("data-validation","required");
			$('#trad-block').css({ 'display': "block" });
		}
}


function profile_section(){

	if ($("#check2").is(':checked')){
		$(".comp-valid").attr("data-validation","required");
		$(".indi-valid").removeAttr("data-validation");
		$('.indi-form').css({ 'display': "none" });
		$('.co-form').css({ 'display': "block" });
	}

	if ($("#check1").is(':checked')){
		$(".indi-valid").attr("data-validation","required");
		$(".comp-valid").removeAttr("data-validation");
		$('.indi-form').css({ 'display': "block" });
		$('.co-form').css({ 'display': "none" });
	}
}

function tax_info_data(str){
		if ($("#check4").is(':checked')){
			$('.indi-form-tax').css({ 'display': "none" });
			$('.co-form-tax').css({ 'display': "block" });
			$(".tax-valid").removeAttr("data-validation");
		}
		if ($("#check3").is(':checked')){
			$('.indi-form-tax').css({ 'display': "block" });
			$(".tax-valid").attr("data-validation","required");
		}
	}
function tax_info(str){

		if(str =="true"){
            //$("#elementId").css({ 'display': "block" });
			$('.indi-form-tax').css({ 'display': "block" });
		}

		if(str =="false"){
			$('.indi-form-tax').css({ 'display': "none" });
		}
	}

function payment_info(str){
	   if(str =="bank"){
			$('.bank-form').css({ 'display': "block" });
			$('.paypal-form').css({ 'display': "none" });
			$('.stripe-form').css({ 'display': "none" });
		}
		if(str =="paypal"){
			$('.bank-form').css({ 'display': "none" });
			$('.paypal-form').css({ 'display': "block" });
			$('.stripe-form').css({ 'display': "none" });

		}
		if(str =="stripe"){
			$('.bank-form').css({ 'display': "none" });
			$('.paypal-form').css({ 'display': "none" });
			$('.stripe-form').css({ 'display': "block" });
		}
}

function payment_info_data(){

	if ($("#check7").is(':checked')){

		$(".bank-valid").removeAttr("data-validation");
		$(".paypal-valid").removeAttr("data-validation");
		$(".stripe-valid").attr("data-validation","email,required");

		$('.bank-form').css({ 'display': "none" });
		$('.paypal-form').css({ 'display': "none" });
		$('.stripe-form').css({ 'display': "block" });
	}

	if ($("#check6").is(':checked')){

		$(".bank-valid").removeAttr("data-validation");
		$(".paypal-valid").attr("data-validation","email,required");
		$(".stripe-valid").removeAttr("data-validation");
		$('.bank-form').css({ 'display': "none" });
		$('.paypal-form').css({ 'display': "block" });
		$('.stripe-form').css({ 'display': "none" });
	}

	if ($("#check5").is(':checked')){

		$(".bank-valid").attr("data-validation","required");
		$(".paypal-valid").removeAttr("data-validation");
		$(".stripe-valid").removeAttr("data-validation");
		$('.bank-form').css({ 'display': "block" });
		$('.paypal-form').css({ 'display': "none" });
		$('.stripe-form').css({ 'display': "none" });
	}
}

function add_more_service(){
	var lastid = $(".service_courier:last").attr("id");
	var num_data =lastid.split('-');
	var num = num_data[1];
	var next_num = parseInt(num)+1;


	var html = '<tr class="service_courier" id="service_courier-'+next_num+'">\
	                <td>\
	                	<input name="cservice['+next_num+'][service_name]" id="example-text-input" class="form-control" data-validation="requried" type="text">\
	                </td>\
	                <td>\
	                	<input name="cservice['+next_num+'][min_day]" id="example-text-input" class="form-control" data-validation="required,number" type="text">\
	                </td>\
	                <td>\
	                	<input name="cservice['+next_num+'][max_day]" id="example-text-input" class="form-control" data-validation="required,number" type="text">\
	                </td>\
	                <td style="position:relative">\
	                	<a href="javascript:void(0);" class="tax-delete-btn order-delete-btn" onclick="delete_service_row('+next_num+')"><img src="/theme/plugins/images/close_btn.png"></a>\
	                </td></tr>';

	 $(".cservice_tbl tbody").append(html);


}

function delete_service_row(str){
	$("#service_courier-"+str).remove();
}

function makerandomid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function get_new_message()
{
  $.ajax({
   type: 'POST',
   url:"/admin/dashboard/get_new_message",
     success: function(response) {
       $("#new_msg").html(response);
     }
  });
}


function get_new_notification()
{
  $.ajax({
   type: 'POST',
   url:"/admin/dashboard/get_new_notification",
     success: function(response) {
       $("#new_notification").html(response);
     }
  });
}


function get_to_user_select(){

	$("#to_user_select").on("change", function() {
    var to_user_type = $("#to_user_type").val();
    var to_user_select = $("#to_user_select").val();
    $('#to_user').html("");
    $.ajax({
      type: "POST",
      url: "/admin/ajax/get_to_user_with_subscriber",
      data: {
        to_user_type: to_user_type,
        to_user_select: to_user_select
      },
      success: function(data) {
        var toAppend = '';
        if (data != '0') {
          toAppend += '<option value = "">Please Select</option>';
          if (to_user_select == 'GROUP') {
            for (var i = 0; i < data.length; i++) {
              toAppend += '<option value= ' + data[i]['id'] + '>' + data[i]['groupname'] + '</option>';
            }
          } else if(to_user_type=='VENDOR' || to_user_type=='USER'){
          	 for (var i = 0; i < data.length; i++) {
              toAppend += '<option value= ' + data[i]['id'] + '>' + data[i]['f_name'] + '</option>';
            }

          }else if(to_user_type=='SUBSCRIBER'){
            for (var i = 0; i < data.length; i++) {
              toAppend += '<option value= ' + data[i]['id'] + '>' + data[i]['email'] + '</option>';
            }
          }

          $('#to_user_lable').show();
          $('#to_user').html(toAppend);
        } else {
          $('#to_user_lable').hide();
        }

      }
    });
  });
}



function manage_shiping_change(str,basket_id){
	$.ajax({
	   type: 'POST',
	   url:"/admin/add_order/shiping_change",
	   dataType: "json",
	   data:{"ship":str,"bid":basket_id},
	   success: function(response) {

	       get_basket_data(2)
	     }
	  });
}

function get_varient_attribute_data(basket_id){

  $.ajax({
	   type: 'POST',
	   url:"/admin/add_order/get_varient_attribute_data",
	   dataType: "json",
	   data:{"bid":basket_id},
	   success: function(response) {
	       $("#attribute_data_"+basket_id).html(basket_id)
	     }
	  });
 }

 function change_var_product_price(str){

 	var id_d = str.id;
 	var val_d = $(str).val();
 	var vald_ar = val_d.split('_');
 	var val_data = vald_ar[0];

 	var mpid_arr = id_d.split('_')
 	var mpid = mpid_arr[2];

 	$.ajax({
	   type: 'POST',
	   url:"/admin/add_order/change_var_product_price",
	   dataType: "json",
	   data:{"product_id":val_data,mpid:mpid,val_d:val_d},
	   success: function(response) {
	   		//$(".check-prod-5b4da4b5e4c88da75e3e7efd").prop("name","sdfsd");
	   		// setTimeout(function(){
	   		// 	alert($(".check-prod-5b4da4b5e4c88da75e3e7efd").attr("name"));
	   		// },1000);

	       $("#product_price_"+mpid).html(response.special_price);
	       $("#product_name_"+mpid).html(response.name);
	       $("#product_sku_"+mpid).html(response.sku);
	       if(response.set_qt==0){
	       	$("#check_box_"+mpid).html("Out of Stock");
	       }

	       if(parseInt(response.set_qt)==1){
	       	var checked ='';
	       	var value = '<input class="form-control form-control-solid placeholder-no-fix check-prod-'+mpid+'" type="checkbox" '+checked+' id="'+mpid+'" onclick = "return getcheckboxid(this)" name="product['+mpid+']" autocomplete="off" value="">'

	       	$("#check_box_"+mpid).html(value);
	       }
	       //
	       if(response.associate==1){
		       $("#quantity_"+mpid).prop("name","quantity["+val_data+"]");
		       $("#varient_data_"+mpid).prop("name","varient_data_"+val_data);
		   }
	     }
	  });
 }

function set_attribute_data() {
    var cat_id = $("#select_category").val();
    $.ajax({
        type: 'POST',
        url: "/admin/product/get_attribute_data",
        data: {
            cat_id: cat_id
        },
        success: function(response) {}
    })
};

function check_relation_cat_attr() {
    var cat_id = $("#select_category").val();
    
    $.ajax({
        type: 'POST',
        url: "/admin/product/get_relation",
        data: {
            cat_id: cat_id
        },
        success: function(response) {
            if (response.cat_msg) {
                $(".cat-error").show();
                $(".cat-error").html(response.cat_msg)
            } else {
                $(".cat-error").hide();
                window.location.href = "/admin/product/add?cat_id=" + cat_id;
            }
        }
    })
};

function div_toggle(del) {
    $("." + del).toggle();
}

var supplier_items_list = [];
       $('#publication_id').on('change', function () 
             {
                var publication_id = $("#publication_id").val();
               
                   get_publication_details(publication_id); 
             });

       $('#vendor_id').on('change', function () 
             {

                var vendor_id = $("#vendor_id").val();

                   get_vendor_details(vendor_id); 
               
             });

            function remove_current_items(publication_id)
            {
                 $(".items_tr").css("display", "none");
                 
                 $.ajax({
                type: 'POST',

                url: ADMINSITEURL + "Purchaseorder/get_tr",
                data: {type:"cross_remove"},
                success: function(response) 
                {
                    if(response)
                    {   
                        $(".select21").select2();
                        $( ".last-item-row" ).before(response);                       
                    }
                }
            });
            }

            function get_publication_details(publication_id)
            {

                 $.ajax({
                    type: 'POST',
                    url: ADMINSITEURL + "Purchaseorder/get_publication_details",
                    data: {
                        id: publication_id
                    },
                    success: function(response) 
                    {
                        if(response)
                        {
                            var data = response.publication;
                            supplier_items_list =  response.product; 

                            if(data.length > 0)
                            {
                               var name =data[0].name?data[0].name:'';
                                var address =data[0].address?data[0].address:'';

                                var phone =data[0].phone?data[0].phone:'';

                                var email =data[0].email?data[0].email:'';

                                var id =data[0].id?data[0].id:'';


                            }else{
                                 var name ="";
                                var address ="";
                                var phone ="";
                                var email ="";
                                var id ="";
                            }
                            

                            var html = `
                                <div class="clientinfo">
                                    <h3>Supplier Details</h3> 
                                    <input type="hidden" name="customer_id" id="customer_id" value=${id}>
                                    <div id="customer_name">
                                        <strong>Name :</strong> ${name} 
                                    </div>
                                </div>
                                <div class="clientinfo">
                                    <div id="customer_address1">
                                        <strong> Address : </strong>${address}
                                    </div>
                                </div>
                                <div class="clientinfo">
                                    <div type="text" id="customer_phone">
                                        <strong>Phone : </strong>${phone}<br>
                                        <strong>Email : </strong>${email}
                                    </div>
                                </div>`;
                                $("#vendor_html").hide();
                            $("#customer").show();
                            $("#customer").html(html);
                        }
                       
                }
            });
            }
           /* $('body').on('click','.removeProd',function () 
             {
               
               var ele=jQuery(this);
               ele.parents('tr').next().remove();
               ele.parents('tr').remove();
               
            }); */
            $('body').on('click','.removeProd',function () 
             {
               
               var ele=jQuery(this);
               ele.closest('.white-box').remove();
               //ele.parents('table').closest('.white-box').remove();
               //ele.parents('tr').remove();
               
            });
             $('body').on('click','.editremoveProd',function () 
             {
               
               var ele=jQuery(this);
               ele.parents('tr').next().remove();
               ele.parents('tr').remove();
               editrowTotal();
               
            });
            
            $('body').on('click','.addProd',function () 
             {

                var random =$('.addProd').attr('row_count')
               
                 var random_int =parseInt(random);
                 var set_int = random_int+1;
                
                $('.addProd').attr('row_count',set_int);
               
            $.ajax({
                type: 'POST',
                url: ADMINSITEURL + "Purchaseorder/get_tr",
                data: {class_int:random_int},
                success: function(response) 
                {
                    if(response)
                    {
                         var length = $( ".white-box" ).length - 1;
                        $( ".white-box" ).each(function( index ) 
                        {
                            if(length ==index)
                            {
                                $( this ).after(response);
                            }
                        
                        });
                       // $( ".last-item-row" ).before(response);
                       // $(".select_"+random_int).select2();
                        $(".select_"+random_int).select2({
                        ajax: {
                        url: '/admin/product/get_prd_name_sku',
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                        return {
                        q: params.term, // search term
                        page: params.page
                        };
                        },
                        processResults: function (data, params) {
                        // parse the results into the format expected by Select2
                        // since we are using custom formatting functions we do not need to
                        // alter the remote JSON data, except to indicate that infinite
                        // scrolling can be used
                        params.page = params.page || 1;

                        return {
                        results: data.items,
                        pagination: {
                        more: (params.page * 30) < data.total_count
                        }
                        };
                        },
                        cache: true
                        },
                        placeholder: 'Search for a repository',
                        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
                        minimumInputLength: 1,
                        templateResult: formatRepo,
                        templateSelection: formatRepoSelection
                        });

                        $(".select_"+random_int).css({"width": "100%"});

                        }
                        }
                        });
                        });


/*});*/

function autocomplete_list(auto,item_deatils)
 {
    var id     =   item_deatils.id;
    var quentity =item_deatils.quantity;
   // var price    =item_deatils.price;
   var parenttr = $(auto).parents('tr');

    parenttr.find('.amnt').val(quentity);    
    parenttr.find('.pdId').val(id);
    parenttr.find('.discount').val("0");
    rowTotal();
    
 }




function isNumber(evt, element) 
{

        var charCode = (evt.which) ? evt.which : event.keyCode

        if (
            (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57))
            return false;

        return true;
}  
function autocomplete_ajax(evt) 
{
    var customer_id = $("#customer_id").val();
    if(!customer_id)
    {        
        alert("Must be select first Supplier");
        setTimeout(function(){ $(evt).val('');}, 100);
        
    }else{

    $(evt).autocomplete({
        source: function(request, resolve) {
            // fetch new values with request.term
            let matched = supplier_items_list.filter(function(o, i){
                var p = new RegExp(request.term);
                return p.test(o.sku) || p.test(o.name.name);
            });
            resolve(matched);
        },
        select: function( event, ui ) {
            autocomplete_list(evt,ui.item);
            rowTotal();
            evt.value = ui.item.name.name
            return false;
          },
        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append( `<div>${item.name.name} (${item.sku})</div>` )
              .appendTo( ul );
        };
}
            
};

/*function rowTotal() 
{
    var total_discount=0; 
    var total_amnt=0;
    var total_tax=0;     
    var final_price=0;  
  
   
    $('.tfr > tbody  > tr').each(function(column, td) 
    {
        var row_amnt = 0;
          
       var discount =$(this).find('.discount').val()?$(this).find('.discount').val():0;
       var amnt =$(this).find('.amnt').val()?$(this).find('.amnt').val():0;
       var prc =$(this).find('.prc').val()?$(this).find('.prc').val():0;
       var vat =$(this).find('.vat').val()?$(this).find('.vat').val():0;
        
       var taxrull_amount = $(".taxrull_amount").val()?$(".taxrull_amount").val():0;
       var is_tax_apply = $(".is_tax_apply").val()?$(".is_tax_apply").val():0;
       var tax_type = $(".tax_type").val()?$(".tax_type").val():0;
       var normal_amnt =(parseInt(amnt) * parseInt(prc) );
       

       var taxa = 0;
       if(is_tax_apply=="on")
       {
        
        if(tax_type == 0)
        {
            taxa = parseFloat(taxrull_amount);
            
        }
        //tax in %
        if(tax_type == 1)
        {
             taxa = (parseFloat(normal_amnt)*parseFloat(taxrull_amount))/100;
           
        }
       }

       var discount_rull = $("#discountFormat").val();
       
       var discount_amount = 0;
       
       if(discount_rull)
       {
       
        switch (discount_rull) 
        { 
        case 'FDAT':        
        row_amnt = (parseFloat(normal_amnt)+parseFloat(taxa))-parseFloat(discount);        
        break;
         case 'FDBT': 
        row_amnt = (parseFloat(normal_amnt)-parseFloat(discount))+parseFloat(taxa);
        break; 
        case 'PDBT': 
        row_amnt = (parseFloat(normal_amnt) - ((parseFloat(normal_amnt)*parseFloat(discount))/100))+parseFloat(taxa);
        break; 
        case 'PDAT': 
        var withtaxamount = parseFloat(normal_amnt) +parseFloat(taxa)
        row_amnt =(parseFloat(withtaxamount) - ((parseFloat(withtaxamount)*parseFloat(discount))/100));
        break;
        default:
         row_amnt = (parseFloat(normal_amnt)+parseFloat(taxa));
       }
   }

       $(this).find('.vat').val(taxrull_amount); 
       $(this).find('.taxa').val(taxa); 
       taxa =$(this).find('.taxa').val();   

       $(this).find('.ttlamount_val').val(row_amnt);
       ttamnt =$(this).find('.ttlamount_val').val();
             
      if(normal_amnt)
       {
       total_amnt= parseInt(normal_amnt) + parseInt(total_amnt);
       } 
       if(discount)
       {
       total_discount= parseFloat(discount) + parseFloat(total_discount);
       }
       if(taxa)
       {
       total_tax= parseFloat(taxa) + parseFloat(total_tax);
       }

       
    });
    $(".total_tax").val(total_tax);
    $(".total_amount").val(total_amnt);
    $(".total_discount").val(total_discount);
    var shipVal = $(".shipVal").val()?$(".shipVal").val():0;
    var final_amnt =(parseFloat(total_tax) + parseFloat(total_amnt) + parseFloat(shipVal) )- parseFloat(total_discount);
    $(".final_amount").val(final_amnt);
   
};*/


function changeTaxFormat(tax_id) 
{
   
   var tax_id = $(tax_id).val();
   if(tax_id == 'off')
   {
    var taxrull_amount = 0;
    var is_tax_apply = 'off';
    var tax_type = '0';
    $(".taxrull_amount").val(taxrull_amount);
    $(".is_tax_apply").val(is_tax_apply);
    $(".tax_type").val(tax_type);
     $(".class_taxchange").html("Tax(Off)");
     rowTotal();

   }else
   {
    $.ajax({
                type: 'POST',
                url: ADMINSITEURL + "Purchaseorder/taxclass_details",
                data: {'tax_id':tax_id},
                success: function(response) 
                {
                   if(response)
                   {
                    var taxrull_amount = response.rate_value;
                    var is_tax_apply = 'on';
                    var tax_type = response.rate_type;
                    $(".taxrull_amount").val(taxrull_amount);
                    $(".is_tax_apply").val(is_tax_apply);
                    $(".tax_type").val(tax_type);
                    if(tax_type == '0')
                    {
                       
                        $(".class_taxchange").html("Tax(Fixed)");
                    }
                    else
                    {
                       $(".class_taxchange").html("Tax(%)"); 
                    }
                    rowTotal();

                   }
                }
            });
   }
};
function changeDiscountFormat(tax_id) 
{
   rowTotal();
};
function check_product(id)
{
    var school_id = $("#school_id").val();
    var class_id = id;
    var category_id = $("#category").val();
    
    $.ajax({
        type: 'POST',
        url: "/admin/ajax/check_product",
        data: {
            class_id: class_id,
            school_id:school_id,
            category_id:category_id
        },
        success: function(response) {
            if (response == "fail") {
               return true;
            }
            if (response != "success") 
            {
                 $("#class").val('');
                $(".class-error").html("<span class='form-error' style='color:red;'>" + response + "</span>");
            }
        }
    })

};

function editrowTotal() 
{
    var total_discount=0; 
    var total_amnt=0;
    var total_tax=0;     
    var final_price=0;  
  
   
    $('.tfr > tbody  > tr').each(function(column, td) 
    {
        
        var referrecord_id = $(this).attr("referrecord_id");

       var taxclass_id = $("#taxclass_id").val()?$("#taxclass_id").val():0;     
      

        var row_amnt = 0;
          
       var discount =$(this).find('.discount').val()?$(this).find('.discount').val():0;
       var amnt =$(this).find('.amnt').val()?$(this).find('.amnt').val():0;
       var prc =$(this).find('.prc').val()?$(this).find('.prc').val():0;
       var vat =$(this).find('.vat').val()?$(this).find('.vat').val():0;
        
        
       
       var normal_amnt =(parseInt(amnt) * parseInt(prc) );

        if(taxclass_id)
       {
        
        var is_tax_apply = $(".is_tax_apply").val()?$(".is_tax_apply").val():0;
        var tax_type = $(".tax_type").val()?$(".tax_type").val():0;
        var taxrull_amount = $(this).find('.vat').val()?$(this).find('.vat').val():$(".taxrull_amount").val()?$(".taxrull_amount").val():0;   
       
       }
       else
       {
      
        var is_tax_apply = $("."+referrecord_id+" .is_tax_apply_input").val()?$("."+referrecord_id+" .is_tax_apply_input").val():0;
        var tax_type = $("."+referrecord_id+" .tax_type_input").val()?$("."+referrecord_id+" .tax_type_input").val():0;
        var taxrull_amount =  $(this).find('.vat').val()?$(this).find('.vat').val():$("."+referrecord_id+" .taxrull_amount_input").val()?$(this).find(".taxrull_amount_input").val():0;    
        
         }
        

       var taxa = 0;
       if(is_tax_apply=="on")
       {
        
        if(tax_type == 0)
        {
            taxa = parseFloat(taxrull_amount);
            
        }
        //tax in %
        if(tax_type == 1)
        {
             taxa = (parseFloat(normal_amnt)*parseFloat(taxrull_amount))/100;
           
        }
       }



       var discount_rull = $("#discountFormat").val();
       
       if(!discount_rull)
       {
        discount_rull = $("."+referrecord_id+" .discount_rull_input").val()
       }


       //console.log(discount_rull);
       var discount_amount = 0;

        
       if(discount_rull)
       {
       
        switch (discount_rull) 
        { 
        case 'FDAT':        
        row_amnt = (parseFloat(normal_amnt)+parseFloat(taxa))-parseFloat(discount);        
        break;
         case 'FDBT': 
        row_amnt = (parseFloat(normal_amnt)-parseFloat(discount))+parseFloat(taxa);
        break; 
        case 'PDBT': 
        row_amnt = (parseFloat(normal_amnt) - ((parseFloat(normal_amnt)*parseFloat(discount))/100))+parseFloat(taxa);
        break; 
        case 'PDAT': 
        var withtaxamount = parseFloat(normal_amnt) +parseFloat(taxa)
        row_amnt =(parseFloat(withtaxamount) - ((parseFloat(withtaxamount)*parseFloat(discount))/100));
        break;
        default:
         row_amnt = (parseFloat(normal_amnt)+parseFloat(taxa));
       }
   }
       
       $(this).find('.vat').val(taxrull_amount); 
       $(this).find('.taxa').val(taxa); 
       taxa =$(this).find('.taxa').val();   

       $(this).find('.ttlamount_val').val(row_amnt);
       ttamnt =$(this).find('.ttlamount_val').val();
             
      if(normal_amnt)
       {
       total_amnt= parseInt(normal_amnt) + parseInt(total_amnt);
       } 
       if(discount)
       {
       total_discount= parseFloat(discount) + parseFloat(total_discount);
       }
       if(taxa)
       {
       total_tax= parseFloat(taxa) + parseFloat(total_tax);
       }

       
    });

    $(".total_tax").val(total_tax);
    $(".total_amount").val(total_amnt);
    $(".total_discount").val(total_discount);
    var shipVal = $(".shipVal").val()?$(".shipVal").val():0;
    var final_amnt =(parseFloat(total_tax) + parseFloat(total_amnt) + parseFloat(shipVal) )- parseFloat(total_discount);
    $(".final_amount").val(final_amnt);
   
};
 function get_refund_value(refund_id){

  $.ajax({
	   type: 'POST',
	   url:"/admin/returnrequest/get_refund_value",
	   dataType: "json",
	   data:{"refund_id":refund_id},
	   success: function(response) {
	     
	     }
	  });
 }


 function calculate_tax_amount(data){
   var purchase_price=$('#purchase_price').val();
   var tax_rate=data.value;

   if(purchase_price){
     var tax_amount=((purchase_price*tax_rate)/100);
      $('#taxamt').html('Tax Amount='+tax_amount);
   }else{
     alert('First fill the price field!');
     return false;
   }

 }

 	// vendor reject code
  function vendor_rejected(id){		
  	
		swal({
			 title: "Are you sure, to change product status?",
			 text: "Product status has been changed?",
			 type: "warning",
			 showCancelButton: true,
			 confirmButtonColor: "#DD6B55",
			 confirmButtonText: "Yes, change it!",
			 cancelButtonText: "No, Cancel",
			 closeOnConfirm: false,
			 closeOnCancel: false,
             showLoaderOnConfirm: true,
		}, function(isConfirm){
			if (isConfirm) {
				$.ajax({
						 type: 'POST',
						 url: ADMINSITEURL+"vendorrequest/vendor_rejected",
						 data: { id : id },
						 success: function(response) {
							location.reload();
						 }
					});
				}
				else{
					swal("Cancelled", "Your data is safe :)", "error");
				}

	});
}

function update_lin_vendor(){
		var controller = $("#cont").val();
  		var function_data = $("#fun").val();
  		var tbl = controller;
  		  $.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+controller+"/update_vendor_linnworks",
			 data: $("#tbl_form").serialize(),
			 success: function(response) {
				$('#'+tbl+'_tbl').DataTable().destroy();
						$('#'+tbl+'_tbl').DataTable({
					        "processing": true,
					        "serverSide": true,
					        "ordering": true,
                  			"sDom": 'Rfrtlip',
					        "columnDefs": [ {
						          "targets": 'no-sort',
						          "orderable": false,
						    } ],
					        "ajax": ADMINSITEURL+controller+"/"+function_data+"/"
					   	 });
                   
				    $("#all_check").prop("checked", false);
			 }
		 });
}

function update_lin_product(){
		var controller = $("#cont").val();
  		var function_data = $("#fun").val();
  		var tbl = controller;
  		  $.ajax({
			 type: 'POST',
			 url: ADMINSITEURL+controller+"/update_product_linnworks",
			 data: $("#tbl_form").serialize(),
			 success: function(response) {
				$('#'+tbl+'_tbl').DataTable().destroy();
						$('#'+tbl+'_tbl').DataTable({
					        "processing": true,
					        "serverSide": true,
					        "ordering": true,
                  			"sDom": 'Rfrtlip',
					        "columnDefs": [ {
						          "targets": 'no-sort',
						          "orderable": false,
						    } ],
					        "ajax": ADMINSITEURL+controller+"/"+function_data+"/"
					   	 });
                   
				    $("#all_check").prop("checked", false);
			 }
		 });
}
/*-- start for add author --*/
  function save_author(evt)
  {
   
    var form_id = evt;//$(evt).attr("id");
    var form_data = $('#'+form_id).serialize();
    var status = true;
    var author = $("#recipient-name1");
    $(".err").remove();
    if(author.val()==""){
      $(".err_author").remove();
      $(author).after("<span class='err_author err'>Please Enter Author</span>");
      status = false;
    }
  if(status){
      $.ajax({
         type: 'POST',
         url: ADMINSITEURL+"manageauthor/add_author",
         data: $('#'+form_id).serialize(),
         success: function(response) {
          if(response)
          {
        $('#author_select').append(response);
        $('#'+form_id)[0].reset();
        $(".close_author").click();

        var json ={};
        json.id= "#author_select";
        json.url= '/admin/manageauthor/get_author_list';
        json.msg= 'Search for a author';

        ajax_select_list(json);
         
        }
          return true;          
         }
       })
    }else{
      return false;
    }
  }

  function save_publication(evt)
  {
    var form_id = evt;//$(evt).attr("id");
    var form_data = $('#'+form_id).serialize();
    var status = true;
    var publication = $("#publication-name1");
    $(".err").remove();
    if(publication.val()==""){
      $(".err_publication").remove();
      $(publication).after("<span class='err_publication err'>Please Enter Publication</span>");
      status = false;
    }
  if(status){
      $.ajax({
         type: 'POST',
         url: ADMINSITEURL+"managepublication/add_publication",
         data: $('#'+form_id).serialize(),
         success: function(response) {
          if(response)
          {
        $('#publication_select').append(response);
        $('#'+form_id)[0].reset();
        $(".close_publication").click(); 
        $("#publication_select").css({"width": "100%"});   

        var json = {};
        json.id= "#publication_select";
        json.url= '/admin/managepublication/get_publication_list';
        json.msg= 'Search for a publication';

        ajax_select_list(json);

          }
          return true;          
         }
       })
    }else{
      return false;
    }
  }

  function save_editor(evt)
  {
    var form_id = evt;
    var form_data = $('#'+form_id).serialize();
    var status = true;
    var editor = $("#editor-name1");
   
    $(".err").remove();
    if(editor.val()==""){
      $(".err_editor").remove();
      $(editor).after("<span class='err_editor err'>Please Enter Editer</span>");
      status = false;
    }
  if(status){
      $.ajax({
         type: 'POST',
         url: ADMINSITEURL+"manageediter/add_editor",
         data: $('#'+form_id).serialize(),
         success: function(response) {
           
          if(response)
          {
           
            $('#editor_select').append(response);
            $('#'+form_id)[0].reset();
            $("#close_editer").click();
            var json = {};
            json.id= "#editor_select";
            json.url= '/admin/manageauthor/get_author_list';
            json.msg= 'Search for a editor';

            ajax_select_list(json);

          }
          return true;          
         }
       })
    }else{
      return false;
    }
  }

  function save_brand(evt)
  {
    var form_id = evt;
    var form_data = $('#'+form_id).serialize();
    var status = true;
    var brand = $("#brand-name1");
   
    $(".err").remove();
    if(brand.val()==""){
      $(".err_brand").remove();
      $(brand).after("<span class='err_brand err'>Please Enter Brand</span>");
      status = false;
    }

    if(status){
      $.ajax({
         type: 'POST',
         url: ADMINSITEURL+"brand/add_brand",
         data: $('#'+form_id).serialize(),
         success: function(response) {
           
          if(response)
          {
           
            $('#brand_select').append(response);
            $('#'+form_id)[0].reset();
            $("#close_brand").click();
            var json = {};
            json.id= "#brand_select";
            json.url= '/admin/brand/get_brand_list';
            json.msg= 'Search for a brand';

            ajax_select_list(json);

          }
          return true;          
         }
       })
    }else{
      return false;
    }

  }
  

  function show_model(evt)
  {
    var btn_id = $(evt).attr("btn_id");
    $("#"+btn_id).click(); 
    return false;
  }
  

function setdata_attribute(id, sch_id) 
{

    var data = {sch_id: sch_id,cat_id: id};
    var url = ADMINSITEURL + "schoolproduct/get_category_attributeset";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(response) {
         
            $(".err_category").remove();
              $("#category").parent('div').removeClass("has-error");
            if(response)
            {
            var sch_id = $('#school_id').val();
            var url = ADMINSITEURL + "schoolproduct/add?sch_id=" + sch_id + "&cat_id=" + id;
            window.location.href = url;
            }
            else
            {
              $(".err_category").remove();
              $("#category").parent('div').addClass("has-error");
              $("#category").after("<span class='help-block form-error err_category err'>Must be create a relation with attribute set. </span>");
              $('#category').find($('option')).attr('selected',false)
            }
        }
    });
}

function check_varient(evt)
{
    
    var product_id = $(evt).val();

    var class_id = $(evt).closest('tr').attr('class_val');

     $.ajax({
        type: 'POST',
        url: ADMINSITEURL + "product/get_varent",
        data: {
            id: product_id,
            class_id:class_id,
            type :"product_detail",

        },
        success: function(response) 
        {

            if(response)
            {
                /*while(true){                    
                    if($(evt).closest('tr').next().attr("class") != 'items_tr')
                        $(evt).closest('tr').next().remove();
                    else
                        break;
                }*/
                //$(response).insertAfter($(evt).closest('tr').closest('tr'));
                $("#profile"+class_id).html(response)
                check_varient_varient_data(evt);
                
                

            }
        }
    });

}

function check_varient_varient_data(evt)
{
    
    var product_id = $(evt).val();
    var class_id = $(evt).closest('tr').attr('class_val');

     $.ajax({
        type: 'POST',
        url: ADMINSITEURL + "product/get_varent",
        data: {
            id: product_id,
            class_id:class_id,
            type :"varient_data",

        },
        success: function(response) 
        {
            if(response)
            {
               /* while(true){                    
                    if($(evt).closest('tr').next().attr("class") != 'items_tr')
                        $(evt).closest('tr').next().remove();
                    else
                        break;
                }*/

               // $(response).insertAfter($(evt).closest('tr').closest('tr'));
               $("#varient_"+class_id).html(response)
               // $(response).insertAfter($(evt).closest('tr').closest('tr'));

            }
        }
    });

}



function check_varient_edit(evt,view_type)
{
    var prdId = $(evt).attr('prdId');
     var class_id = $(evt).closest('tr').attr('class_val');


    if (typeof view_type === "undefined" || view_type === null) 
    { 
    view_type = "test"; 
    }
    if(prdId == undefined)
    {
        var product_id = $(evt).val();
   }else
   {
    var product_id = prdId;        
   }

    var po_id = $("#po_id").val();
    var class_id = $(evt).closest('tr').attr('class_val');
    console.log("check_varient_edit-------------"+class_id)
     $.ajax({
        type: 'POST',
        url: ADMINSITEURL + "product/get_varent_edit",
        data: {
            id: product_id,
            prd_id:po_id,
            class_id:class_id,
            type :"product_detail",
            view_type:view_type,
        },
        success: function(response) 
        {
            if(response)
            { 
               
            /* while(true)
             {                    
                    if($(evt).closest('tr').next().attr("class") != 'items_tr')
                        $(evt).closest('tr').next().remove();
                    else
                        break;
            }*/
          
             $("#profile"+class_id).html(response)
                check_varient_edit_data(evt,view_type);
            //$(response).insertAfter($(evt).closest('tr').closest('tr'));

            }
        }
    });


}

function check_varient_edit_data(evt,view_type)
{
    
    var product_id = $(evt).val();
    var po_id = $("#po_id").val();
    var class_id = $(evt).closest('tr').attr('class_val');
    console.log("check_varient_edit_data-------------"+class_id)
     $.ajax({
        type: 'POST',
        url: ADMINSITEURL + "product/get_varent_edit",
        data: {
            id: product_id,
            prd_id:po_id,
            type :"varient_data",
            class_id:class_id,
            type :"varient_data",
            view_type:view_type,
        },
        success: function(response) 
        {
            if(response)
            { 
               
            /* while(true)
             {                    
                    if($(evt).closest('tr').next().attr("class") != 'items_tr')
                        $(evt).closest('tr').next().remove();
                    else
                        break;
            }*/
            //$(response).insertAfter($(evt).closest('tr').closest('tr'));
            $("#varient_"+class_id).html(response)

            }
        }
    });


}

function change_billfrom(evt)
    {
        var bill_from = $(evt).val();
        if(bill_from == undefined)
        {
            bill_from =evt;
        }
        if(bill_from =="Vendor")
        {
            $(".vendor_id").show();
            $(".publication_id").hide();
            $(".select2").css({"width": "100%"});
        }
        if(bill_from =="Publisher" || bill_from =="Publication")
        {
            $(".vendor_id").hide();
            $(".publication_id").show();
            $(".select2").css({"width": "100%"});
        }
    }

    function get_vendor_details(publication_id)
            {
               
                 $.ajax({
                    type: 'POST',
                    url: ADMINSITEURL + "Purchaseorder/get_vendor_details",
                    data: {
                        id: publication_id
                    },
                    success: function(response) 
                    {
                        if(response)
                        {
                            var data = response.publication;
                            if(data.length > 0)
                            {
                               var name =data[0].name?data[0].name:'';
                                var address =data[0].address?data[0].address:'';

                                var phone =data[0].phone?data[0].phone:'';

                                var email =data[0].email?data[0].email:'';

                                var id =data[0].id?data[0].id:'';


                            }else{
                                 var name ="";
                                var address ="";
                                var phone ="";
                                var email ="";
                                var id ="";
                            }
                            supplier_items_list =  response.product; 
                            var html = `
                                <div class="clientinfo">
                                    Supplier Details <hr>
                                    <input type="hidden" name="customer_id" id="customer_id" value=${id}>
                                    <div id="customer_name">
                                        <strong>${name}</strong>
                                    </div>
                                </div>
                                <div class="clientinfo">
                                    <div id="customer_address1">
                                        <strong>${address}</strong>
                                    </div>
                                </div>
                                <div class="clientinfo">
                                    <div type="text" id="customer_phone">
                                        Phone: <strong>${phone}</strong><br>
                                        Email: <strong>${email}</strong>
                                    </div>
                                </div>`;

                            $("#customer").hide();
                            $("#vendor_html").show();
                            $("#vendor_html").html(html);
                        }
                       
                }
            });
             }

     function check_qutity(evt,val)
    { 
        var evt_val = $(evt).val();
        var val = parseInt(val);
        var evtVal = parseInt(evt_val);
        
        if(evtVal> val)
        {
            $(evt).val('');
        }       
    }


function rowTotal() 
{
        var total =$('.total').val()?$('.total').val():0;
        var Shipping =$('.Shipping').val()?$('.Shipping').val():0;
        var totalother_amnt =0;
        var subtotal=0;
        var total_amnt=0;
        var total_amnt_sum=0;
        var discount_amnt_sum=0;
        

        $('.tfr > tbody  > tr').each(function(column, td) 
        {  

        var rowTotal=0;
        var discount_amunt =0;
        var recive_quantity =$(this).find('.recive_quantity').val()?$(this).find('.recive_quantity').val():0;
        var purchase_price =$(this).find('.purchase_price').val()?$(this).find('.purchase_price').val():0;
        var other_amount =$(this).find('.other_amount').val()?$(this).find('.other_amount').val():0;
        var total_amount =$(this).find('.total_amount').val()?$(this).find('.total_amount').val():0;
        var discount =$(this).find('.discount').val()?$(this).find('.discount').val():0;
        


        if((recive_quantity != "undefined") && (purchase_price != "undefined"))
        {
        rowTotal = ( parseInt(recive_quantity) * parseFloat(purchase_price));
        subtotal = parseFloat(subtotal) +( parseInt(recive_quantity) * parseFloat(purchase_price));
        }

        if(discount != "undefined")
        {
            discount_amunt = (parseFloat(rowTotal)*parseFloat(discount))/100;
        }

        
        //rowTotal = (parseFloat(rowTotal)-parseFloat(discount_amunt))+parseFloat(other_amount);
        rowTotal = (parseFloat(rowTotal)-parseFloat(discount_amunt));

        if(other_amount != "undefined")
        {

        other_amount = (parseFloat(rowTotal)*parseFloat(other_amount))/100;

        rowTotal = rowTotal+other_amount;

        totalother_amnt = parseFloat(totalother_amnt) + parseFloat(other_amount);
        
        }

        $(this).find('.total_amount').val(rowTotal.toFixed(2));

        total_amnt_sum = total_amnt_sum+rowTotal;
        discount_amnt_sum = discount_amnt_sum+discount_amunt;

        });

        total_amnt = parseFloat(total_amnt_sum)+ parseFloat(Shipping)
        discount_amnt_sum = discount_amnt_sum.toFixed(2);
        total_amnt = total_amnt.toFixed(2);
        totalother_amnt = totalother_amnt.toFixed(2);
        $('.total').val(total_amnt)
        $('#amountpay').val(total_amnt)
        $('.Shipping').val(Shipping)
        $('.final_Other_Amount').val(totalother_amnt);
        $('.subtotal').val(subtotal);
        $('.discount_total').val(discount_amnt_sum);

};
function formatRepo (repo) {
  if (repo.loading) {
    return repo.text;
  }

  var markup = "<div class='select2-result-repository clearfix'>" +
    "<div class='select2-result-repository__avatar'>" + repo.text + "</div>" +
    "</div>";

  return markup;
}
function change_assign_order(str_val){   
    var detail = str_val.split('_');
    swal({
            title: "Are you sure?",
            text: "You want to change admin ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true,
        }, function(isConfirm){
            if (isConfirm) {
                 $.ajax({
                    type: 'POST',
                    url: ADMINSITEURL + "manageorder/change_assign_order",
                    data: {
                        order_id: detail[0],
                        admin_id:detail[1],
                        code :detail[2]            
                    },
                    success: function(response) 
                    {
                       swal("Changed!", "Your status has been changed successfully", "success");
                    }
                });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
    
}
function change_assign_refund_admin(str_val){
    var detail = str_val.split('_');
    swal({
            title: "Are you sure?",
            text: "You want to change admin ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true,
        }, function(isConfirm){
            if (isConfirm) {
                 $.ajax({
                    type: 'POST',
                    url: ADMINSITEURL + "returnrequest/change_assign_order",
                    data: {
                        refund_id: detail[0],
                        admin_id:detail[1]                                  
                    },
                    success: function(response) 
                    {
                       swal("Changed!", "Your status has been changed successfully", "success");
                    }
                });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
}

function change_assign_cancel_admin(str_val){
    var detail = str_val.split('_');
    swal({
            title: "Are you sure?",
            text: "You want to change admin ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, Cancel",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true,
        }, function(isConfirm){
            if (isConfirm) {
                 $.ajax({
                    type: 'POST',
                    url: ADMINSITEURL + "cancel_order/change_assign_order",
                    data: {
                        cancel_id: detail[0],
                        admin_id:detail[1]                                  
                    },
                    success: function(response) 
                    {
                       swal("Changed!", "Your status has been changed successfully", "success");
                    }
                });
            } else {
                swal("Cancelled", "Your data is safe :)", "error");
            }
        });
}


function formatRepoSelection (repo) {
  return repo.text || repo.text;
}

function ajax_select_list (repo) 
{
  var id= repo.id;
  var url= repo.url;
  var msg= repo.msg;
  var other_data= repo.other_data ? repo.other_data : {};  
  $(id).select2({
  ajax: {
    url: url,
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: params.term, // search term
        page: params.page,
        other_data:other_data
      };
    },
    processResults: function (data, params) {
      // parse the results into the format expected by Select2
      // since we are using custom formatting functions we do not need to
      // alter the remote JSON data, except to indicate that infinite
      // scrolling can be used
      params.page = params.page || 1;
      return {
        results: data.items,
        pagination: {
          more: (params.page * 30) < data.total_count
        }
      };
    },
    cache: true
  },
  placeholder: msg,
  allowClear: true,
  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
  minimumInputLength: 1,
  templateResult: formatRepo,
  templateSelection: formatRepoSelection
});
  
}

function isNumber(evt, element) {

        var charCode = (evt.which) ? evt.which : event.keyCode
        if ((charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
           // (charCode != 46 || $(element).val().indexOf('.') != -1) &&  
            (charCode != 46 ) &&  (charCode != 44) &&  (charCode != 32) &&     // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57))
            {
                return false;
            }else
            {
                return true;
            }
    }  




function autoselect_select2()
{
 $("#publication_select").css({"width": "100%"});  
 $("#author_select").css({"width": "100%"});  
 $("#editor_select").css({"width": "100%"}); 
 $("#brand_select").css({"width": "100%"}); 
 $("#free_ebook").css({"width": "100%"}); 
 $("#subject_select").css({"width": "100%"}); 
 $("#productclass_select").css({"width": "100%"}); 
 $("#board_select").css({"width": "100%"}); 
 $("#additional_language_select").css({"width": "100%"}); 
 $("#shipping_region").css({"width": "100%"});
 $("#pschool_id").css({"width": "100%"});
 $("#splan_id").css({"width": "100%"});

var json ={};
json.id= "#author_select";
json.url= '/admin/manageauthor/get_author_list';
json.msg= 'Search for a author';

ajax_select_list(json);

var json = {};
json.id= "#publication_select";
json.url= '/admin/managepublication/get_publication_list';
json.msg= 'Search for a publication';

ajax_select_list(json);

var json = {};
json.id= "#editor_select";
json.url= '/admin/manageauthor/get_author_list';
json.msg= 'Search for a editor';

ajax_select_list(json); 

var json = {};
json.id= "#brand_select";
json.url= '/admin/brand/get_brand_list';
json.msg= 'Search for a brand';
ajax_select_list(json); 

var json = {};
json.id= "#free_ebook";
json.url= '/admin/product/get_free_ebook_list';
json.msg= 'Search for a free_ebook';


ajax_select_list(json);  


var json ={};
json.id= "#subject_select";
json.url= '/admin/subject/get_subject_list';
json.msg= 'Search for a subject';

ajax_select_list(json);

var json ={};
json.id= "#productclass_select";
json.url= '/admin/productclass/get_productclass_list';
json.msg= 'Search for a class';

ajax_select_list(json);
var json ={};
json.id= "#board_select";
json.url= '/admin/board/get_board_list';
json.msg= 'Search for a board';

ajax_select_list(json);

var json ={};
json.id= "#additional_language_select";
json.url= '/admin/additionallanguage/get_additional_language_list';
json.msg= 'Search for additional language';

ajax_select_list(json);


 var json ={};
  json.id= "#shipping_region";
  json.url= '/admin/shipingrule/get_shipping_region_list';
  json.msg= 'Search for a shipping region';
  var shipping_id = $("#shipping_region").attr('data_edit_id');
  //alert(shipping_id);
  json.other_data = shipping_id?shipping_id:'';

  ajax_select_list(json);

  var json ={};
  json.id= "#pschool_id";
  json.url= '/admin/manageschool/get_school_list';
  json.msg= 'Search for a school';

  ajax_select_list(json);

  var json ={};
  json.id= "#splan_id";
  json.url= '/admin/SubscribedPlanreport/get_plan_list';
  json.msg= 'Search for a plan';

  ajax_select_list(json);

}

function show_modeldata(evt)
  {
        var btn_id = $(evt).attr("btn_id");
        var json_data = $(evt).attr("json_data");
        var obj = JSON.parse(json_data);
        var templete_header = `<div class="modal-header"> <h4 class="modal-title" id="exampleModalLabel1">`+obj.name+`</h4></div>`;

        var templete_body = ` <form action="" method="post" id="`+obj.id+`_form">
        <div class="modal-body">
        <div class="form-group">
        <label for="recipient-name" class="control-label">Name:</label>
        <input type="text" class="form-control" name="name" id="name1" data-validation="required" value ="">
        <input type="hidden" name="table" value ="`+obj.table+`">
        <input type="hidden" name="multiple" value ="`+obj.multiple+`">
        <input type="hidden" name="field_name" value ="`+obj.field_name+`">
        <input type="hidden" name="type" value ="`+obj.type+`">
        </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-default close" data-dismiss="modal" >Close</button>
        <input class="btn btn-success btn-form-submit" type="button" value="Submit" onclick="`+obj.onclick+`">
        </div>
        </form>`;
        $("#add_dynamic_header").html(templete_header); 
        $("#add_dynamic_data").html(templete_body); 
        $("#"+obj.id).click(); 
        return false;
  }

function save_record_data(evt)
  {
    
    var form_id = evt;  
    var form_data = $('#'+form_id+"_form").serialize();  
    var status = true;
    var editor = $("#name1");
   
    $(".err").remove();
    if(editor.val()=="")
    {
      $(".err_editor").remove();
      $(editor).after("<span class='err_editor err'>Please Enter Name</span>");
      status = false;
    }
  if(status){
    
      $.ajax({
         type: 'POST',
         url: ADMINSITEURL+"manageschool/add_data",
         data:  $('#'+form_id+"_form").serialize(),
         success: function(response) {
           
          if(response)
          {
            $('#'+form_id+"_form")[0].reset();
            var option ='<option value="'+response.data._id+'" selected="selected">'+response.data.name+'</option>';
            var multiselect = response.autoselect;
            $('#'+multiselect).select2();               
            $('#'+multiselect).css("width","100%");
            
            if($('#'+multiselect).data("select2"))
            {
                //$('#'+multiselect).select2('destroy');
                $('#'+multiselect).append(option);
                $('#'+multiselect).select2();
                if($('#'+multiselect).next().next().prop('tagName') == "DIV")
                $('#'+multiselect).next().next().remove();

                 /*setTimeout(function(){
                 alert(1)
                 $('#'+multiselect).select2();
                 console.log($('#'+multiselect).next().next().prop('tagName'));
                 if($('#'+multiselect).next().next().prop('tagName') == "DIV")
                  $('#'+multiselect).next().next().remove();

                 },2000)*/
            }
             else
            $('#'+multiselect).select2();          
            $(".close").click();
          }
          return true;          
         }
       })
    }else{
      return false;
    }
  }
/*
  var allCheckbox = document.querySelector('#allCheckbox');

    allCheckbox.addEventListener('click',()=>{
  
        let checkBox = $('.rowCheckBox');
        if(allCheckbox.checked){
          checkBox.prop('checked',true)
        }else{
          checkBox.prop('checked',false)
        }
        
    
      })*/
           

