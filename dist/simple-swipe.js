/*
Script Name: Simple Swipe
Description: Creates a simple Tinder-like swiping interface
Version: 1
Author: Will Viles
Author URI: http://vil.es/
*/

(function( $, window, document, undefined ){

  // our plugin constructor
  var SimpleSwipe = function( elem, options ){
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
    };

  // the plugin prototype
  SimpleSwipe.prototype = {

    // Initialize
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    init: function() {

      return this;
    }
  }; // End of all functions

  $.fn.SimpleSwipe = function(options) {
    return this.each(function() {
      new SimpleSwipe(this, options).init();
    });
  };

})( jQuery, window , document );
