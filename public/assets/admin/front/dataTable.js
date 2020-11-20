
 $(document).ready(function(){
//alert('asds')
    //product table 
    $('#product_tbl').DataTable({
      "processing": true,
      "serverSide": true,
      "ordering": true,
        "columnDefs": [ {
          "targets": 'no-sort',
          "orderable": false,
    } ],
        "ajax": {
          url: 'http://10.0.4.4:1337/vendor/product/list',
          //data: {zipid : $("#zipid").val()},
          type: "POST"
        }
    });
    
   
    $("th .no-sort").removeClass("sorting_asc");
});
