
  $(document).ready(function(){
 //adminrole
   $('#role_tbl').DataTable({
        "processing": true,
    	"serverSide": true,
    	"ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
        	url: ADMINSITEURL+'role/all_role/',
        	type: "POST"
        }
   	});

   //administrator
   $('#administrator_tbl').DataTable({
        "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'administrator/all_administrator/',
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

   //channel
   $('#consumer_tbl').DataTable({
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "searching": false,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'consumer/all/',
          type: "POST"
        }
    });
   $('#business_tbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "searching": false,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'business/all/',
          type: "POST",
          data:{
                "last_id":$("#last_id").val()
              },
        }
    });

   $('#userplan_tbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'userplan/all/',
          type: "POST",          
        }
    });

   $('#userplanTbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: 'http://10.0.4.26:2080/user/plan/allPlan',
          type: "POST",          
        }
    });

   $('#businessplan_tbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'businessplan/all/',
          type: "POST",          
        }
    });

    $('#user_tbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'user/all/',
          type: "POST",          
        }
    });
    
    $('#class_tbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'class/all/',
          type: "POST",          
        }
    });
    
     $('#section_tbl').DataTable({
    //alert($("#last_id").val());
      "processing": true,
      "serverSide": true,
      "ordering": true,
      "sDom": 'Rfrtlip',
                  "columnDefs": [ {
                      "targets": 'no-sort',
                      "orderable": false,
                } ],
        "ajax": {
          url: ADMINSITEURL+'section/all/',
          type: "POST",          
        }
    });


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

    $('#vendorListTable').DataTable({
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
        url : ADMINSITEURL+'vendor/list',
        type : "POST"
      }
  });
    

    $('#managepage_tbl').DataTable({
      "processing": true,
      "serverSide": true,
      "searching":true,
      "lengthChange":true,
      "sDom": 'Rfrtlip',
      "ordering": true,
        "columnDefs": [ {
          "targets": 'no-sort',
          "orderable": false,

    } ],
        "ajax": {
          url: ADMINSITEURL+'managepage/all_pages',
          type: "POST"
        }
    });

 });




 

