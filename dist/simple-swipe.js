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
      this.$cards = this.$elem.find('li');
      this.options = $.extend({
        // Defaults
        something: false
      }, options);
    };

  // the plugin prototype
  SimpleSwipe.prototype = {

    // Initialize
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    init: function() {



      console.log('SimpleSwipe is being initiated');

      return this;
    },

    // Register Cards
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    registerCards: function() {

    },

    // Handle touch
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////


  }; // End of all functions

  $.fn.SimpleSwipe = function(options) {
    return this.each(function() {
      new SimpleSwipe(this, options).init();
    });
  };

})( jQuery, window , document );
