$(document).ready(function () {

  // Scroll up button on footer
  $(window).scroll(() => {
    let scrollPosition = $(window).scrollTop();
    $("#footer a").show();
    if (scrollPosition < 70) {
      $("#footer a").hide();
    }
  });

  // Scroll up and focus on tweet text when up 
  // button is pressed.
  $("#footer a").click(()=>{
    $(window).scrollTop(200);
    $("#tweet-text").focus();
  })
});
