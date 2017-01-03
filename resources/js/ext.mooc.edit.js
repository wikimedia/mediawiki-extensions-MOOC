( function ( mw, $ ) {
  
  var extConfig = mw.config.get( 'moocAgentData' );
  var item = mw.config.get( 'moocItem' );
  
  // setup user agent for API requests
  $.ajaxSetup({
    beforeSend: function(request) {
      request.setRequestHeader( 'User-Agent', extConfig.userAgentName + '/' + extConfig.version + ' (' + extConfig.userAgentUrl + '; ' + extConfig.userAgentMailAddress + ')' );
    }
  });

  // fill modal boxes with item content
  fillModalBoxes( item );
  
  //mw.loader.using( 'mediawiki.api', loadItem, function() {
  //  console.error( 'failed to load mw.Api' );
  //} );
  
  // TODO: if possible, we should load the VisualEditor instead
  function fillModalBoxes( item ) {
    var htmlListSeparator = '';
    function arrayToHtmlList( a ) {
      if (a === undefined || a.length === 0) {
        return '';
      }
      return htmlListSeparator + a.join( '\n' + htmlListSeparator ) + '\n';
    }
    
    fillModalBox( 'learning-goals', arrayToHtmlList( item['learning-goals'] ) );
    fillModalBox( 'video', item.video );
    fillModalBox( 'further-reading', arrayToHtmlList( item['further-reading'] ) );
  }
  
  function fillModalBox( id, content ) {
    var modalBox = $('#mooc #' + id + '.section .header form.edit .value');
    modalBox.val(content);
  }
  
}( mediaWiki, jQuery ) );
