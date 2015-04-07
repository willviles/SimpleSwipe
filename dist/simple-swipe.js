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
      this.$stack = this.$elem.find('.simple-swipe-stack');
      this.$currentCard = this.$stack.find('li:first-of-type');
      this.options = $.extend({
        // Defaults
        buttonText: {
          'left': '&larr;',
          'up': '&uarr;',
          'down': '&darr;',
          'right': '&rarr;'
        }
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
        $card = this.$stack.find('li:first-of-type');

        // If no cards, send cardsExhausted callback
        if (!$card.length > 0) {
          this.$elem.trigger('cardsExhausted');
          return false;
        }

        // Otherwise, let's set up the card
        this.$currentCard = $card;

        // Setup Hammer.js handler
        var card = new Hammer($card[0]),
            availableDirections = this.card.availableDirections.call(this),
            that = this;

        // Setup buttons
        this.buttons.setup.call(this, availableDirections);

        // Set pan & swipe options
        card.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        card.get('swipe').set({ direction: Hammer.DIRECTION_ALL, threshold: 20 });

        // On a successful swipe
        card.on('swipe', function(event) {
          that.card.handleSwipe.call(that, event, availableDirections);
        });

        // Starting the swipe
        card.on('panstart', function(event) { that.$elem.trigger('swipeStart'); });

        // Moving the card
        card.on('panmove', function(event) {
          that.$elem.trigger('swipeMove', {x: event.deltaX, y: event.deltaY});
          that.card.drag.call(that, event.deltaX, event.deltaY);
        });

        // Dropping the card
        card.on('panend', function(event) {
          that.$elem.trigger('swipeDrop');
          that.card.springBack.call(that);
        });
      },

      // Available Swipe Directions
      availableDirections: function() {
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

      // Throw Out
      ///////////////////////////////////////////////////////
      throwOut: function(direction) {
        console.log(direction);
        // TO-DO: Animate dependent upon direction, then destroy...
        this.$currentCard.remove();
      },

      // Handle Swipe
      ///////////////////////////////////////////////////////
      handleSwipe: function(event, availableDirections) {

        var directionKey = event.direction,
            directionKeys = {'8': 'up', '4': 'right', '2': 'left', '16': 'down'},
            direction = directionKeys[directionKey];

        if ($.inArray(direction, availableDirections) !== -1) {
          this.card.swipeSuccess.call(this, direction);
        } else {
          this.card.swipeUnavailable.call(this, direction);
        }
      },

      // Successful swipe
      ///////////////////////////////////////////////////////
      swipeSuccess: function(direction) {
        // Throw the card out
        this.card.throwOut.call(this, direction);
        // Send event
        this.$elem.trigger('swipeSuccess', direction);
        // Setup next card
        this.card.setup.call(this);
      },

      // Unavailable swipe
      ///////////////////////////////////////////////////////
      swipeUnavailable: function(direction) {
        this.$elem.trigger('swipeUnavailable', direction);
      }

    },

    buttons: {

      setup: function(availableDirections) {
        var $simpleSwipeBtns = this.$elem.find('.simple-swipe-btns'),
            $buttonList = $simpleSwipeBtns.find('ul'),
            btns = '',
            that = this;

        console.log(availableDirections);

        $.each(availableDirections, function(i, direction) {
          var buttonText = that.options.buttonText[direction];
          btns = btns + '<li>' + buttonText + '</li>';
        });

        console.log(btns);

        $buttonList.html('').append(btns);
      }

    }


  }; // End of all functions

  $.fn.SimpleSwipe = function(options) {
    return this.each(function() {
      new SimpleSwipe(this, options).init();
    });
  };

})( jQuery, window , document );
