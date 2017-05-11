

function setToolbarAddon( elt ){
  var btnAddon = $( elt ).html();
  $(elt).toggle().closest(".myportal-portlet").find(".btn-toolbar").prepend( btnAddon );
};

$(function() {
	
	var xs_shown=Cookies.get('xs_shown'); ;
	if (xs_shown == undefined ){ xs_shown=0; }
	var width = $(window).width(), height = $(window).height();

    //  $( "#tabs" ).tabs({cookie: { expires: 90 }}).find("#tabs").sortable({ axis: "x", items: ".btn-tab:gt(0)" });
    // Hide tab content except for tab 1
    var nIdx=1;
    $("div[id^='tab_']").each( function(){
      if( nIdx > 1 ){
        $( this ).hide();
      }
      nIdx++;
    });

    // Désactive drag/drop si résolution petite
    if ( (width <= 768) && (height <= 1024) && (xs_shown==0) )  {
      //alert("Vous ne pourrez visualiser certaines application sous cette résolution ! "); 
	  $().notify("Vous ne pourrez visualiser certaines application sous cette résolution ! ");
      xs_shown++;
      Cookies.set('xs_shown', xs_shown);
    } else {
    // Active drag/drop si résolution grande
      $( ".myportal-column" ).not( ".column-fixed" ).sortable({
      	connectWith: ".myportal-column",
      	items: ".myportal-portlet"
      });
    }

    $( ".myportal-portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix" )
    .find( ".myportal-portlet-header .btn-group" )
    .append( '<a href="#" class="btn btn-default btn-xs"><span class="fa fa-caret-down"></span></a>')
    .end();

    $( ".portlet-fixed" ).find( ".myportal-portlet-header .btn-group" ).html("");

    $( ".myportal-portlet-header .fa-caret-down" ).click(function(e) {
        e.preventDefault();
        $( this ).toggleClass( "fa-caret-up" );
        $( this ).parents( ".myportal-portlet:first" ).find( ".myportal-portlet-content" ).toggle();
    });

    $( ".myportal-portlet-header .btn-close" ).click(function(e) {
        e.preventDefault();
         var id = $( this ).attr('data-widget-id');
         $( this ).parents( ".myportal-portlet:first" ).hide().animate({ "duration": "slow", "easing": "easein" });
    });

	$( ".my-favorites .btn-danger" ).click(function(e) {
        e.preventDefault();
        $( this ).parents( ".well:first" ).hide().animate({ "duration": "slow", "easing": "easein" });
    });

    $( ".myportal-column" ).disableSelection();

    $(".btn-tab > .tab-name").click( function( e ){
      e.preventDefault();
      var theTab =  $(this).attr("data-tab"), idTab=$(this).attr("data-tab-id");
      $(".tabs").each( function() {
        var isTab = $(this).attr("id");
        if( isTab != theTab ){
          $(this).slideUp();
        } else {
          $(this).slideDown();
        }
      });
      var attrUrl=$("#new_widget").attr("href");
      var newUrl= attrUrl.substring(  0 , attrUrl.length - 1 ) + idTab;
      $("#new_widget").attr( "href", newUrl );
    });
});


$('#Widget_modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var title = button.data('title');
  $(this).find('.modal-title').html(title);
})

$('#App_modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var title = button.data('title');
  $(this).find('.modal-title').html(title);
})

/* TEST WINDOWS SIZE */
$( window ).resize( function() {
  width = $(window).width();
  height = $(window).height();
  if ( (width <= 768) && (xs_shown==0) )  {
      alert("Vous ne pourrez visualiser certaines application sous cette résolution ! ")
      xs_shown++;
  }
});
