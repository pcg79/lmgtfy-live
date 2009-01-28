$(function(){
  var $streamData  = [];
  var $streamIndex = getStreamIndex();
  var $streamNode  = $("#stream");

  updateData();

  function updateData() {
    $.getJSON("/recent.json", null, beginStreamRoll);
  }

  function beginStreamRoll(data) {
    $streamData = data;
    rollStream();
  }

  function rollStream() {
    if($streamIndex > $streamData.length - 1) {
      setStreamIndex(0);
      updateData();
    }
    else {
      var nextMessage    = $streamData[$streamIndex];
      var nextMessageUrl = "http://lmgtfy.com/?q=" + gentlyEncode(nextMessage) + "&fwd";
      var newNode        = $("<li style=\"display:none\"><a></a></li>");
      newNode.find("a")
        .attr("href", nextMessageUrl)
        .text(nextMessage);
      $streamNode.append(newNode);
      newNode.slideDown();
      setStreamIndex($streamIndex + 1);
      popOffTheTop();
      setTimeout(function(){ rollStream() }, rand(3000))
    }
  }

  function popOffTheTop() {
    if($streamNode.children().length > 100)
      popOffTheTop = function() { $streamNode.find("li:first").remove(); }
  }

  function setStreamIndex(x) {
    $.cookie("streamIndex", x);
    $streamIndex = x;
  }

  function getStreamIndex() {
    return $streamIndex || parseInt($.cookie("streamIndex")) || 0;
  }
})
