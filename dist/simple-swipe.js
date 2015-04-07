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
      this.$currentCard = this.$elem.find('li:first-of-type');
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

      this.card.setup.call(this);

      return this;
    },

    // Register Cards
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    card: {

      // Setup card
      ///////////////////////////////////////////////////////

      setup: function() {
        // Get first card in the stack
        $card = this.$elem.find('li:first-of-type');
        this.$currentCard = $card;

        // Setup Hammer.js handler
        var card = new Hammer($card[0]),
            availableDirections = this.card.getAvailableDirections.call(this),
            that = this;

        // Set pan options
        card.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        card.get('swipe').set({ direction: Hammer.DIRECTION_ALL, threshold: 20 });

        // On a successful swipe
        card.on('swipe', function(event) {
          that.card.handleSwipe.call(that, event, availableDirections);
        });

        card.on('panstart', function(event) {
          console.log('PAN START');
        });

        card.on('panmove', function(event) {
          that.card.drag.call(that, event.deltaX, event.deltaY);
        });

        card.on('panend', function(event) {
          that.card.springBack.call(that);
        });
      },

      // Set Directions
      getAvailableDirections: function() {
        var card = this.$currentCard,
            defaultDirections = ['up', 'right', 'down', 'left'],
            availableDirections = [];

        $.each(defaultDirections, function(i, direction) {
          if (card.data('swipe-' + direction) == true) {
            availableDirections.push(direction);
          };
        });

        return availableDirections;
      },

      // Drag card
      ///////////////////////////////////////////////////////

      drag: function(x, y) {
        this.$currentCard.css({
         '-webkit-transform': 'translate3d(0, 0, 0) translate(' + x + 'px, ' + y + 'px)'
        });
      },

      // Spring back
      ///////////////////////////////////////////////////////
      springBack: function() {
        this.$currentCard.css({
         '-webkit-transform': 'translate3d(0, 0, 0) translate(0px, 0px)'
        });
      },

      // Handle Swipe
      ///////////////////////////////////////////////////////
      handleSwipe: function(event, availableDirections) {

        var directionKey = event.direction,
            directionKeys = {'8': 'up', '4': 'right', '2': 'left', '16': 'down'},
            direction = directionKeys[directionKey];

        if ($.inArray(direction, availableDirections) !== -1) {
          this.card.next.call(this, direction)
        } else {
          alert(direction + ' swipe NOT AVAILABLE');
        }
      },

      // Move onto next card
      ///////////////////////////////////////////////////////

      next: function(direction) {
        this.$elem.trigger('swipeSuccess', direction);
      }

    },


  }; // End of all functions

  $.fn.SimpleSwipe = function(options) {
    return this.each(function() {
      new SimpleSwipe(this, options).init();
    });
  };

})( jQuery, window , document );
