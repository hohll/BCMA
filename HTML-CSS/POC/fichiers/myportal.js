var width = $(window).width(), height = $(window).height(), shown=0;

function setToolbarAddon( elt ){
  var btnAddon = $( elt ).html();
  $(elt).toggle().closest(".myportal-portlet").find(".btn-toolbar").prepend( btnAddon );
};

$(function() {
    //  $( "#tabs" ).tabs({cookie: { expires: 90 }}).find("#tabs").sortable({ axis: "x", items: ".btn-tab:gt(0)" });
    // Hide tab content except for tab 1
    var nIdx=1;
    $("div[id^='tab_']").each( function(){
      if( nIdx > 1 ){
        $( this ).hide();
      }
      nIdx++;
    });

    if ( (width <= 768) && (height <= 1024) && (shown==0) )  {
      alert("Vous ne pourrez visualiser certaines application sous cette résolution ! ")
      shown++;
    }

    $( ".myportal-column" ).not( ".column-fixed" ).sortable({
    	connectWith: ".myportal-column",
    	items: ".myportal-portlet"
    });

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
         $.ajax({ type: "POST", url: "jsp/site/plugins/myportal/DoRemoveWidget.jsp", data: "id_widget=" + id });
         $( this ).parents( ".myportal-portlet:first" ).hide().animate({ "duration": "slow", "easing": "easein" });
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

/*** Save myportal state on every drap&drop ***/
function saveCurrentConf(  ) {
	var strJson = '{"page":{"name":"Ma page","tabs":[', nIndex=1;
	$( ".btn-tab" ).each( function( tabIndex ){
		//var tabId = $( this ).children("a").attr( "href" );
		var tabId = '#tab_' + nIndex, tabName = $( this ).children( "a:first" ).html(  );
    var colTab = tabId + " .myportal-column";
		strJson += '{"name": "' + tabName + '","widgets":[';
    $( colTab ).each( function( columnPos ) {
      columnPos++;
      $( this ).children( ".myportal-portlet").each( function( portletPos ) {
        var cstate = $( this ).find( ".fa-caret-up");
        strJson += '{"id":' + $(this).attr("id").substring(7) + ', "state": '+ cstate.length + ',"column":' + columnPos + '},';
      });
    });
		strJson += ']},';
    nIndex++;
	});
	strJson += ']}}';
  $.ajax({ type: "POST", url: "jsp/site/plugins/myportal/DoSavePortalState.jsp", data: "portalState=" + strJson });
}

$( ".myportal-column" ).on( "sortstop", saveCurrentConf );

$('#Widget_modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var title = button.data('title');
  $(this).find('.modal-title').html(title);
})

/* TEST WINDOWS SIZE */
$( window ).resize( function() {
  width = $(window).width();
  height = $(window).height();
  if ( (width <= 768) && (shown==0) )  {
      alert("Vous ne pourrez visualiser certaines application sous cette résolution ! ")
      shown++;
  }
});
