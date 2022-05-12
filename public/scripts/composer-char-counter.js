$(document).ready(() => {
  $("#tweet-text").keyup(function () {
    const typedText = $(this).val();
    const numChars = 140 - typedText.length;
    $("#charCounter").text(numChars);
    if (numChars <= 0) {
      $("#charCounter").css("color", "red");
    } else {
      $("#charCounter").css("color", "#545149");
    }
  });
});
