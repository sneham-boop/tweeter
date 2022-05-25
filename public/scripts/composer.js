$(document).ready(function () {
  // Scroll up button on footer
  $(window).scroll(() => {
    let scrollPosition = $(window).scrollTop();
    
    if (scrollPosition < 70) $("#footer a").hide();
    else $("#footer a").show();

    // if (scrollPosition > 373) $(".nav").fadeOut("fast");
    // else $(".nav").show();
  });

  // Scroll up and focus on tweet text when up
  // button is pressed.
  $("#footer a").click(() => {
    $(window).scrollTop(200);
    $(".new-tweet").show(200);
    $("#tweet-text").focus();
  });

  //
  $(".nav-items a").click(() => {
    $(".new-tweet").slideToggle(200, "linear", () => {
      $("#tweet-text").focus();
    });
  });
});
