var TAGGER = TAGGER || {};

TAGGER.model = (function(){

  var $board;
  var crew = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"];
  var currentTag = {};
  var $targetBox = $(".target-box");
  var $mouseX, $mouseY, $xp, $yp;
  // reproducing tags requires id, location, and character name
  // tags stored in tagLocations array should be hashes
  var existingTags = [];

  // mouse enter creates red box
  // $(".tagable-photo img").on("mouseenter", (function(e) {
  //   $(".target-box").addClass('show');
  // }));

  // on mouse move reposition
  // $(".tagable-photo img").on("mousemove", (function(e) {
  //   $(".target-box").offset({ top: e.pageY - 50,
  //                            left: e.pageX - 50
  //                          });
  // }));

  // on mouse exit toggle off
  // $(".tagable-photo img").on("mouseleave", (function(e) {
  //   $(".target-box").removeClass('show');
  // }));

  var handleDrop = {
    toggle: function() {
      $(".options").toggleClass('show');
    },

    makePick: function(e) {
      var $selection = $(this).text();
      var $display = $("#" + currentTag.id);
      // var test = this.parent();
      $display.text($selection);
      handleDrop.toggle($(".dropDown"));
      $display.addClass("tag-to-bottom")
              .append("<span class='close'>" + "x" + "</span>");
      console.log(currentTag);
      console.log($selection);
      saveTag();
    }
  };

  var saveTag = function() {
    existingTags.push(currentTag);
    currentTag = {};
  };

  var randomID = function() {
    var return_id = Math.random().toString().slice(2);
    return return_id;
  };

  var saveCoords = function(e) {
    currentTag.pageX = e.pageX;
    currentTag.pageY = e.pageY;
  };

  var _setTag = function(e) {
    if (currentTag.id) {
      currentTag.$tagContainer.remove();
    }
    currentTag.id = randomID();
    saveCoords(e);
    var $tagContainer = $('<div>').addClass("tag-container")
                                  .appendTo(".tagable-photo")
                                  .offset({ top: e.pageY - 50,
                                           left: e.pageX - 50 });
    currentTag.$tagContainer = $tagContainer;
    var $placedBox = $('<div>').addClass("placed-box")
                               .appendTo($tagContainer);
    var $tag = $('<div>').insertAfter($placedBox)
                         .addClass("option-display")
                         .attr("id", currentTag.id);
    var $button = $('<button>').addClass("dropDown")
                               .attr('id', 'display')
                               .appendTo($tag);
    var $option = $('<div>').insertAfter($button)
                            .addClass("options");
    var $options = $('<ul>').appendTo($option)
                            .addClass("options");
    $.each(crew, function(i, name){
      var $li = $('<li>').text(name)
                         .appendTo($options);
    });
  };

  var _setCreateTagListener = function() {
    $(".tagable-photo img").on("click", (function(e) {
      // $(".target-box").removeClass('show');
      _setTag(e);
      var $selection = $("li");
      $selection.on("click", handleDrop.makePick);
    }));
  };

  var _removeTag = function(e) {
    this.parentNode.parentNode.remove();
    // console.log(this.parentNode.parentNode);
    // console.log(e);
  };

  var _setDeleteTagListener = function() {
    $board.on("click", ".tag-to-bottom .close", _removeTag);
  };

  var _setListeners = function() {
    _setCreateTagListener();
    _setDeleteTagListener();
    //TODO other listeners
  };

  var init = function(){
    $board = $('.tagable-photo');
    _setListeners();
  };

  return {
    init: init
  };

})();

$(document).ready(TAGGER.model.init);
