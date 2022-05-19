$(document).ready(function () {
  
  // Scroll up button on footer
  $(window).scroll(() => {
    const scrollPosition = $(window).scrollTop();
    $("#footer a").show();
    if (scrollPosition < 70) {
      $("#footer a").hide();
    }
  });
});
