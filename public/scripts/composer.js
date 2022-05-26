$(document).ready(function () {
  
  // Detect screen scrolling
  $(window).scroll(() => {
    let scrollPosition = $(window).scrollTop();
    if (scrollPosition < 70) $("#footer a").hide();
    else $("#footer a").show();
  });

  // Scroll up and focus on tweet form when "up"
  // button is pressed.
  $("#footer a").click(() => {
    $(window).scrollTop(200);
    $(".new-tweet").show(200);
    $("#tweet-text").focus();
  });

  // Focus on tweet form when double bouncy arrow is pressed
  $(".nav-items a").click(() => {
    $(".new-tweet").slideToggle(200, "linear", () => {
      $("#tweet-text").focus();
    });
  });
});
