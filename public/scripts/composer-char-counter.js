$(document).ready(() => {
  
  // Tweet character counter
  $("#tweet-text").keyup(function () {
    const typedText = $(this).val();
    const numChars = 140 - typedText.length;
    const charCounter = "#tweet-text + div output";

    $(charCounter).text(numChars);
    if (numChars < 0) $(charCounter).addClass("text-color-red");
    else $(charCounter).removeClass("text-color-red");
  });
});
