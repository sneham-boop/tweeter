$(document).ready(function () {
  // Scroll up button on footer
  $(window).scroll(() => {
    $("#footer a").fadeTo(100, 1, function () {
      $(this).fadeTo(100, 0.5);
    });
  });
});
