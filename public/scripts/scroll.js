// USING https://github.com/jquery/jquery-mousewheel

if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
  $(function() {
    $('.user-posts').mousewheel(function(evt, chg) {
       this.scrollLeft -= (chg * 50); //need a value to speed up the change
       evt.preventDefault();
    });
  });
}