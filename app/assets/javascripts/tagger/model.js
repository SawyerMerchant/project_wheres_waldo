var TAGGER = TAGGER || {};

TAGGER.model = (function(){

  var $board;
  var crew = ["Waldo", "Wenda", "Odlaw", "Wizard Whitebeard", "Woof"];
  var currentTag = {};
  var $targetBox = $(".target-box");
  var $mouseX, $mouseY, $xp, $yp;
  // reproducing tags requires id, location, and character name
  // tags stored in tagLocations array should be hashes
  var existingTags = {};
  var gameOver = false;
  var highFive = {JRS: "00:05", AGR: "00:04", URS: "00:03", SRS: "00:02", BRS: "00:01"};

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
      var $display = $("#" + currentTag.f_id);
      // var test = this.parent();
      $display.text($selection);
      handleDrop.toggle($(".dropDown"));
      $display.addClass("tag-to-bottom")
              .append("<span class='close'>" + "x" + "</span>");

      currentTag.name = $selection;
      // console.log($selection);
      saveTag();
      var index = crew.indexOf($selection);
      if (index > -1) {crew.splice(index, 1);}
    }
  };

  var saveTag = function() {
    existingTags[currentTag.f_id] = currentTag.$tagContainer;
    // console.log(existingTags);
    databasePersist(currentTag.f_id);
    currentTag = {};
  };

  var databasePersist = function(id) {
    // console.log(currentTag.f_id);
    $.ajax( {
      url: "/tags",
      type: "POST",
      contentType: 'application/json',
      dataType: "json",
      data: JSON.stringify({tag :
                {front_id: currentTag.f_id,
                 name: currentTag.name,
                 tagX: currentTag.$tagContainer.offset().top,
                 tagY: currentTag.$tagContainer.offset().left}
               }),
      success: function() {
        // alert("Got it");
      }
    });
  };

  var randomID = function() {
    var return_id = Math.random().toString().slice(2, 11);
    return return_id;
  };

  var _setTag = function(e) {
    if (currentTag.f_id) {
      currentTag.$tagContainer.remove();
    }
    currentTag.f_id = randomID();
    var $tagContainer = $('<div>').addClass("tag-container")
                                  .appendTo(".tagable-photo")
                                  .offset({ top: e.pageY - 50,
                                           left: e.pageX - 50 });
    currentTag.$tagContainer = $tagContainer;
    var $placedBox = $('<div>').addClass("placed-box")
                               .appendTo($tagContainer);
    var $tag = $('<div>').insertAfter($placedBox)
                         .addClass("option-display")
                         .attr("id", currentTag.f_id);
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
    // console.log($(this.parentNode).text().slice(0, -1));
    crew.push($(this.parentNode).text().slice(0, -1));
    $.ajax( {
      url: "/tags/" + this.parentNode.id,
      type: "POST",
      contentType: 'application/json',
      dataType: "json",
      method: "delete",
      success: function() {
        // alert("Gone");
      }
    });
  };

  var _setDeleteTagListener = function() {
    $board.on("click", ".tag-to-bottom .close", _removeTag);
  };

  var _setWinListener = function() {
    $board.on("click", (function() {
      if (crew.length === 0) {
        // alert("All tags set!");
        var $time = parseInt($("#time").text().replace(':', ''));
        $userID = $(".tagable-photo").attr("data-id");
        console.log($time);
        $.ajax( {
          url: "/users/" + $userID,
          type: "GET",
          contentType: 'application/json',
          dataType: "json",
          data: JSON.stringify({score: $time}),
          method: "patch",
          success: function() {
            alert("winner");
          }
        });
      }
    }));
  };

  var _setListeners = function() {
    _setCreateTagListener();
    _setDeleteTagListener();
    _setWinListener();
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
