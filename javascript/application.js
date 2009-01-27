$(function(){
  var $stream_data  = [];
  var $stream_index = getStreamIndex();
  var $stream_node  = $("#stream");

  updateData();

  function updateData() {
    $.log("updating data");
    $.getJSON("/recent.json", null, beginStreamRoll);
  }

  function beginStreamRoll(data) {
    $stream_data = data;
    $.log("got data: %s", $stream_data[0]);
    $.log("begin stream roll");
    rollStream();
  }

  function rollStream() {
    if($stream_index > $stream_data.length - 1) {
      $.log("rolling: %i > %i", $stream_index, $stream_data.length - 1);
      setStreamIndex(0);
      updateData();
    }
    else {
      var new_node     = $("<li style=\"display:none\">foo</li>");
      var next_message = $stream_data[$stream_index];
      new_node.text(next_message);
      $stream_node.append(new_node);
      $stream_node.find("li:last").slideDown();
      setStreamIndex($stream_index + 1);
      popOffTheTop();
      setTimeout(function(){ rollStream() }, rand(3000))
    }
  }

  function popOffTheTop() {
    if($stream_node.children().length > 100)
      popOffTheTop = function() { $stream_node.find("li:first").remove(); }
  }

  function setStreamIndex(x) {
    $.cookie("streamIndex", x);
    $stream_index = x;
  }

  function getStreamIndex() {
    return $stream_index || parseInt($.cookie("streamIndex")) || 0;
  }
})
