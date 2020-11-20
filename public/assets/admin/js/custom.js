/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

    "use strict";

    var body = $("body");

    $(function () {
        $(".preloader").fadeOut();
        $('#side-menu').metisMenu();
    });
    

    /* ===== Open-Close Right Sidebar ===== */

    $(".right-side-toggle").on("click", function () {
        $(".right-sidebar").slideDown(50).toggleClass("shw-rside");
        $(".fxhdr").on("click", function () {
            body.toggleClass("fix-header"); /* Fix Header JS */
        });
        $(".fxsdr").on("click", function () {
            body.toggleClass("fix-sidebar"); /* Fix Sidebar JS */
        });

        /* ===== Service Panel JS ===== */

        var fxhdr = $('.fxhdr');
        if (body.hasClass("fix-header")) {
            fxhdr.attr('checked', true);
        } else {
            fxhdr.attr('checked', false);
        }
        if (body.hasClass("fix-sidebar")) {
            fxhdr.attr('checked', true);
        } else {
            fxhdr.attr('checked', false);
        }
    });

    /* ===========================================================
        Loads the correct sidebar on window load.
        collapses the sidebar on window resize.
        Sets the min-height of #page-wrapper to window size.
    =========================================================== */

    $(function () {
        var set = function () {
                var topOffset = 60,
                    width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width,
                    height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; /* 2-row-menu */
                } else {
                    $('div.navbar-collapse').removeClass('collapse');
                }

                /* ===== This is for resizing window ===== */

                if (width < 1170) {
                    body.addClass('content-wrapper');
                    $(".open-close i").removeClass('icon-arrow-left-circle');
                    $(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                    $(".logo span").hide();
                } else {
                    body.removeClass('content-wrapper');
                    $(".open-close i").addClass('icon-arrow-left-circle');
                    $(".logo span").show();
                }

                height = height - topOffset;
                if (height < 1) {
                    height = 1;
                }
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            },
            url = window.location,
            element = $('ul.nav a').filter(function () {
                return this.href === url || url.href.indexOf(this.href) === 0;
            }).addClass('active').parent().parent().addClass('in').parent();
        if (element.is('li')) {
            element.addClass('active');
        }
        $(window).ready(set);
        $(window).on("resize", set);
    });

    /* ===================================================
        This is for click on open close button
        Sidebar open close
    =================================================== */

    $(".open-close").on('click', function () {
        if ($("body").hasClass("content-wrapper")) {
            $("body").trigger("resize");
            $(".sidebar-nav, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
            $("body").removeClass("content-wrapper");
            $(".open-close i").addClass("icon-arrow-left-circle");
            $(".logo span").show();
        } else {
            $("body").trigger("resize");
            $(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
            $("body").addClass("content-wrapper");
            $(".open-close i").removeClass("icon-arrow-left-circle");
            $(".logo span").hide();
        }
    });

    /* ===== Collapsible Panels JS ===== */

    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-collapse"]',
            panelRemover = '[data-perform="panel-dismiss"]';
        $(panelSelector).each(function () {
            var collapseOpts = {
                    toggle: false
                },
                parent = $(this).closest('.panel'),
                wrapper = parent.find('.panel-wrapper'),
                child = $(this).children('i');
            if (!wrapper.length) {
                wrapper = parent.children('.panel-heading').nextAll().wrapAll('<div/>').parent().addClass('panel-wrapper');
                collapseOpts = {};
            }
            wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
                child.removeClass('ti-minus').addClass('ti-plus');
            }).on('show.bs.collapse', function () {
                child.removeClass('ti-plus').addClass('ti-minus');
            });
        });

        /* ===== Collapse Panels ===== */

        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel'),
                wrapper = parent.find('.panel-wrapper');
            wrapper.collapse('toggle');
        });

        /* ===== Remove Panels ===== */

        $(document).on('click', panelRemover, function (e) {
            e.preventDefault();
            var removeParent = $(this).closest('.panel');

            function removeElement() {
                var col = removeParent.parent();
                removeParent.remove();
                col.filter(function () {
                    return ($(this).is('[class*="col-"]') && $(this).children('*').length === 0);
                }).remove();
            }
            removeElement();
        });
    }(jQuery, window, document));

    /* ===== Tooltip Initialization ===== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ===== Popover Initialization ===== */

    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    /* ===== Task Initialization ===== */

    $(".list-task li label").on("click", function () {
        $(this).toggleClass("task-done");
    });
    $(".settings_box a").on("click", function () {
        $("ul.theme_color").toggleClass("theme_block");
    });

    /* ===== Collepsible Toggle ===== */

    $(".collapseble").on("click", function () {
        $(".collapseblebox").fadeToggle(350);
    });

    /* ===== Sidebar ===== */

    $('.slimscrollright').slimScroll({
        height: '100%',
        position: 'right',
        size: "5px",
        color: '#dcdcdc'
    });
    $('.slimscrollsidebar').slimScroll({
        height: '100%',
        position: 'right',
        size: "5px",
        color: '#dcdcdc'
    });
    $('.chat-list').slimScroll({
        height: '100%',
        position: 'right',
        size: "5px",
        color: '#dcdcdc'
    });


    /* ===== Resize all elements ===== */

    body.trigger("resize");

    /* ===== Visited ul li ===== */

    $('.visited li a').on("click", function (e) {
        $('.visited li').removeClass('active');
        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });

    /* ===== Login and Recover Password ===== */

    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });




    /* =================================================================
        Update 1.5
        this is for close icon when navigation open in mobile view
    ================================================================= */

    $(".navbar-toggle").on("click", function() {
        $(".navbar-toggle i").toggleClass("ti-menu").addClass("ti-close");
    });


    $(".add-more-btn").on("click",function(){

        //var duplicate_content = $(".custom-order-details-content")[0].outerHTML;

       // $(".custom-order-details-wrap .panel .custom-order-details-sec").prepend(duplicate_content);



    });

    //$(".custom-order-details-wrap .panel .custom-order-details-sec").find(".custom-order-details-content").eq(0).addClass('hide-btn');

    $(".add-more-btn-rule").on("click",function(){
      
      var duplicate_content = $(".custom-order-details-content tbody tr")[0].innerHTML;
    
      $(".custom-order-details-wrap .panel .custom-order-details-sec .custom-order-details-content tbody").append("<tr>"+duplicate_content+"</tr>");

      //$(".custom-order-details-wrap .panel .custom-order-details-sec ").append('<a href="javascript:void(0);" class="tax-delete-btn order-delete-btn" ><img src="/theme/plugins/images/close_btn.png"/></a>');

     $('.cls_btn').show();
     $('#cls-btn').hide();

      var elements =  $(".custom-order-details-wrap .panel .custom-order-details-sec").find(".custom-order-details-content tbody tr");
      
      if(elements.length>1){
        $('.cls_btn').append('<a href="javascript:void(0);" class="tax-delete-btn order-delete-btn"><img src="/theme/plugins/images/close_btn.png"/></a>');
      }
      
    elements.eq(parseInt(elements.length-1)).find("input").val('*');
    elements.eq(elements.length-1).find(".shiping_price input").val('');
    
    $(".tax-delete-btn").on("click",function(){
       

        if($(".tax-delete-btn").length>1){
         $(this).parent().parent().remove();
       }
     });
     $(".order-delete-btn").on("click",function(){
        
        
         if($(".order-delete-btn").length>1){
          $(this).parent().parent().remove();
        }
      });

  });

    // for shipping rule
    $(".add-more-btn-shipping-rule").on("click",function(){      
     var duplicate_content = $(".custom-order-details-content tbody tr")[0].innerHTML;
     $(".custom-order-details-wrap .panel .custom-order-details-sec .custom-order-details-content tbody").append("<tr>"+duplicate_content+"</tr>");
     $('.cls_btn').show();
     $('#cls-btn').hide();
      var elements =  $(".custom-order-details-wrap .panel .custom-order-details-sec").find(".custom-order-details-content tbody tr");
     if(elements.length>1){
        $('.cls_btn').append('<a href="javascript:void(0);" class="tax-delete-btn order-delete-btn"><img src="/theme/plugins/images/close_btn.png"/></a>');
      }
      
    elements.eq(parseInt(elements.length-1)).find("input").val('');
    elements.eq(elements.length-1).find(".shiping_price input").val('');
    
    $(".tax-delete-btn").on("click",function(){
        if($(".tax-delete-btn").length>1){
         $(this).parent().parent().remove();
       }
     });
     $(".order-delete-btn").on("click",function(){
         if($(".order-delete-btn").length>1){
          $(this).parent().parent().remove();
        }
      });
  });

    // for shipping rule

    

    $(".order-delete1").on("click",function(){
        
         $(this).parent().parent().remove();
    });

    $(".order-delete-btn").on("click",function(){
        
        if($(".order-delete-btn").length>1){
         //$(this).parent().remove();
         $(this).parent().parent().remove();
       }

      /*$(".add-more-btn-rule").on("click",function(){

        var duplicate_content = $(".custom-order-details-content tbody tr")[0].innerHTML;
        
        $(".custom-order-details-wrap .panel .custom-order-details-sec .custom-order-details-content tbody").append("<tr>"+duplicate_content+"</tr>");
      var elements =  $(".custom-order-details-wrap .panel .custom-order-details-sec").find(".custom-order-details-content");
      elements.eq(elements.length-1).find("input").val('');

    });*/

    });

    $(".searchhead").click(function(){

        $(".searchbox").slideToggle("slow");
      /*  $('.ti-search').addClass('hide_data');
        $('.ti-close').toggleClass('show_data');*/
        //$("ti-search").toggleClass("ti-search ti-close");
        var class_data = $("#global_search").attr('class');

        if(class_data=="srch-icn ti-search")
        {
          $("#global_search").removeClass("ti-search");
          $("#global_search").addClass("ti-close");
        }
        if(class_data=="srch-icn ti-close")
        {
          $("#global_search").removeClass("ti-close");
          $("#global_search").addClass("ti-search");
        }

    });


});
