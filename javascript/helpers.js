(function($) {
  $.fn.sponsor = function(programFile, callback) {
    var self = this;
    $.getJSON(programFile, function(program) {
      var sponsor = program.slots[rand(program.slots.length)];
      var id = sponsor.id;
      var anchor = self.find("a");
      anchor.attr("href", sponsor.url);
      anchor.find("img").attr("src", sponsor.image);
      anchor.find("p").html(sponsor.message);
      if (pageTracker) {
        pageTracker._trackPageview("/sponsor/" + id);
        anchor.click(function() { pageTracker._trackPageview("/outgoing/sponsor/" + id); });
      }
      if (callback) callback.call(self);
    });
    return self;
  };

})(jQuery);

function rand(max) {
  return Math.floor(Math.random() * max);
}

$.log = $.fn.log = function (msg) {
  if (console && console.log){
    console.log("%s: %o", msg, this);
  }
  return this;
};