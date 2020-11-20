function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function delete_product_image(del){
	$("#image_"+del).remove();
}

$(document).ready(function(){
var jsonData, i = 0, j = 0;
    $.ajax({
			 type: 'GET',
			 url: ADMINSITEURL+"product/get_all_category",			
			  success: function(response) {
				 //***************
			   jsonData = response;
               var arr = [];
               var k = 0;
               for (var i = 0; i < jsonData.length; i++) {
                  for (var j = 0; j < jsonData.length; j++) {
                     if (i != j) {
                        if (jsonData[i].parent_id == jsonData[j].id) {
                           arr.push(i);
                           if (jsonData[j].nodes && jsonData[j].nodes) {
                              jsonData[j].nodes.push(jsonData[i]);
                           } else {
                              jsonData[j].nodes = [];
                              jsonData[j].nodes.push(jsonData[i]);
                           }
                        }
                     }
                  }
               }
               if (arr.length) {
                  var res = [];
                  for (var i = 0; i < jsonData.length; i++) {
                     if (arr.indexOf(i) == -1) {
                        res.push(jsonData[i]);
                     }
                  }
                  jsonData = res;
               }
               var arrdata = [];
               $('#parent').treeview({
                  data: jsonData,
                  showIcon: false,
                  showCheckbox: true,
                  onNodeChecked: function (event, node) {
                     var str = '';
                     var id='';
                     arrdata.push({id: node.id, text: node.slug});
                     for (var i = 0; i < arrdata.length; i++) {
                        str += arrdata[i].text;
                        id += arrdata[i].id;
                        if (arrdata.length - 1 != i) {
                           str += ',';
                           id += ',';
                        }
                     }
                     $("button.selectpicker span.filter-option").html(str);
                     $("#save_data").val(id);
                  },
                  onNodeUnchecked: function (event, node) {
                     if (arrdata.length) {
                        var str = '';
                        var id='';
                        var obj = {"id": node.id, "text": node.slug};
                        var ind = -1;
                        for (var i = 0; i < arrdata.length; i++) {
                           if (arrdata[i].id == node.id) {
                              ind = i;
                           }
                        }
                        arrdata.splice(ind, 1);
                        if (arrdata.length == 0) {
                           str = 'Nothing selected';
                        } else {
                           for (var i = 0; i < arrdata.length; i++) {
                              str += arrdata[i].text;
                              id += arrdata[i].id;
                              if (arrdata.length - 1 != i) {
                                 str += ',';
                                 id += ',';
                              }
                           }
                        }
                        $("button.selectpicker span.filter-option").html(str);
                     }
                     $("#save_data").val(id);
                  }
               });
                   
				 //****************
			 }
		 });
		
});
 function showparentId() {
            $("#parent").toggleClass("hide");
         }
