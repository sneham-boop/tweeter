/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // Function imaplementation for preventing 
  // cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function implementation to create html 
  // for single tweet container
  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const tweetText = tweetData.content.text;
    const tweetTextSafe = escape(tweetText);
    const time = tweetData.created_at;

    const $tweetElement = `
    <article class="single-tweet">
      <header>
        <div>
          <img src="${user.avatars}">
          <span>${user.name}</span>
        </div>
        <p class="user-id bold">${user.handle}</p>
      </header>
      <p class="tweet-text-log bold">${tweetTextSafe}</p>
      <footer>
        <time class="bold">${timeago.format(time)}</time>
        <div class="interaction-icons-container">
          <a href="#"><i class="flag-icon fa-solid fa-flag fa-2xs"></i></a>
          <a href="#"><i class="retweet-icon fa-solid fa-retweet fa-2xs"></i></a>
          <a><i class="heart-icon fa-solid fa-heart fa-2xs"></i> </a>
        </div>
      </footer>
    </article>`;
    return $tweetElement;
  };

  // Function implementation to render all tweets
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // Function implementation to get all existing tweets
  const loadTweets = () => {
    $.getJSON("/tweets").done(function (tweets) {
      // Refresh tweets
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  };

  // Function implementation for tweet validation
  const validateTweet = (tweetLength, tweetData) => {
    const alertUser = ".tweet-form-alert";
    let alertText = "";
    $(alertUser).hide();
    // Condition 1 - Empty
    if (tweetLength === 0) alertText = "Alert: Enter a tweet!";

    // Condition 2 - Too long
    if (tweetLength > 140)
      alertText = "Alert: Shorten tweet to 140 characters.";

    // Condition 3 - Only spaces
    const withoutSpaces = tweetData.replace(/%20/gi, "");
    if (tweetLength > 0 && withoutSpaces.length === 5)
      alertText = "Alert: Enter something else except for spaces.";

    if (alertText.length > 0) {
      $(alertUser).text(alertText).fadeIn(500);
      return false;
    }
    return true;
  };

  // Submit new tweet
  $(".tweet-form").submit(function (event) {
    event.preventDefault();

    const tweetData = $(this).serialize();
    const tweetText = $("#tweet-text").val();
    const tweetLength = tweetText.length;

    // Error checking
    const valid = validateTweet(tweetLength, tweetData);
    if (!valid) return;

    // Post tweet
    $.post("/tweets", tweetData).done(() => {
      loadTweets();

      // Reset tweet form
      const charCounter = "#tweet-text + div output";
      $("#tweet-text").val("");
      $(charCounter).text("140");
    });
  });

  // Load initial tweets
  loadTweets();
});
