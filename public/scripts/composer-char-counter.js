$(document).ready(() => {
  // Function implementation for tweet character counter
  $("#tweet-text").keyup(function () {
    const typedText = $(this).val();
    const numChars = 140 - typedText.length;
    const counter = "#tweet-text + div output";

    $(counter).text(numChars);
    if (numChars < 0) $(counter).addClass("text-color-red");
    else $(counter).removeClass("text-color-red");
  });
});
