/**
 * Add a loading image
 * @param idContentToAdd ID of the content to add the image
 * @param idContentImg ID of the div of the image
 * @return void
 */
function addImgLoading( idContentToAdd, idContentImg ) {
	var imgLoadingHtml = '<div id="' + idContentImg + '">';
	imgLoadingHtml += '<img src="images/skin/plugins/myportal/loading.gif" alt="Loading" title="Loading" />';
	imgLoadingHtml += '</div>';
	$( '#' + idContentToAdd ).append( imgLoadingHtml );
}

/**
 * Reload the content
 * @param link the link where the action is taken
 * @param url the url of the ajax
 * @param idLinks ID of the div of the links
 * @param idContentToAdd ID of the content to add the image
 * @param idContentImg ID of the div of the image
 * @return void
 */
function reloadContent( link, url, idLinks, idContentToAdd, idContentImg ) {
	$( 'input[name="search_widgets_name"]' ).attr( 'value', '' );
	$( '#' + idLinks + ' a' ).each( function( i ) {
		if ( $( this ).parent().hasClass( 'active' ) ) {
			$( this ).parent().removeClass( 'active' );
		}
	} );
	$( link ).parent().addClass( 'active' );
	$( '#' + idContentImg ).remove(  );
	//addImgLoading( idContentToAdd, idContentImg );
	$.ajax( {
		type: 'POST',
		url : url,
		cache : false,
		error : function( msg ) {
			$( '#' + idContentImg ).remove(  );
		},
		success : function( data ) {
			$( '#' + idContentImg ).remove(  );
			$( '#' + idContentToAdd ).append( data );
		}
	});

}

/**
 * Do search widgets
 * @param link the link where the action is taken
 * @param url the url of the ajax
 * @param idLinks ID of the div of the links
 * @param idContentToAdd ID of the content to add the image
 * @param idContentImg ID of the div of the image
 * @return void
 */
function doSearchWidgets( url, idLinks, idContentToAdd, idContentImg ) {
	$( '#' + idLinks + ' a' ).each( function( i ) {
		if ( $( this ).hasClass( 'active' ) ) {
			$( this ).removeClass( 'active' );
		}
	} );
	$( '#' + idContentImg ).remove(  );
	addImgLoading( idContentToAdd, idContentImg );
	$.ajax( {
		type: 'POST',
		url : url,
		data : $( 'input[name="search_widgets_name"]' ),
		error : function( msg ) {
			$( '#' + idContentImg ).remove(  );
		},
		success : function( data ) {
			$( '#' + idContentImg ).remove(  );
			$( '#' + idContentToAdd ).append( data );
		}
	} );
}

/**
 * Get the parameters of the given url
 * @param url the url
 * @return the parameters as a HashMap
 */
function getUrlParameters( url ) {
    var parameters = [], hash;
    var hashes = url.slice( url.indexOf( '?' ) + 1 ).split( '&' );
    for( var i = 0; i < hashes.length; i++ ) {
        hash = hashes[i].split( '=' );
        parameters.push( hash[0] );
        parameters[hash[0]] = hash[1];
    }
    return parameters;
}

/**
 * Build the paginator URL when the JS is activated
 * @param urlForJs the url of the paginator when the JS is activated
 * @param urlPaginator the url of tha paginator
 * @return the url with its parameters when the JS is activated
 */
function buildPaginatorUrlForJs( urlForJs, urlPaginator ) {
	// Add the parameter 'page_index' to the url
	var pageIndex = getUrlParameters( urlPaginator )['page_index'];
	var pageIndexParameter = "page_index=" + pageIndex;
	if ( urlForJs.indexOf( '?' ) > 0 ) {
		pageIndexParameter = '&' + pageIndexParameter;
	} else {
		pageIndexParameter = '?' + pageIndexParameter;
	}
	return urlForJs + pageIndexParameter;
}
