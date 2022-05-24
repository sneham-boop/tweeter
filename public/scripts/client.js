/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create tweet container html
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

  // Render all tweets
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // Get all existing tweets
  const loadTweets = () => {
    $.getJSON("/tweets").done(function (tweets) {
      // Replace old dataset with new
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  };

  // Tweet validation
  const validateTweet = (tweetLength) => {
    const alertUser = ".tweet-form-alert";
    $(alertUser).hide();
    if (tweetLength === 0) {
      $(alertUser).slideDown(500).text("Alert: Enter a tweet!");
      return false;
    }
    if (tweetLength > 140) {
      $(alertUser)
        .text("Alert: This string is too long. Shorten to 140 characters.")
        .slideDown(500);
      return false;
    }
    return true;
  };

  // New tweet
  $(".tweet-form").submit(function (event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    const tweetText = $("#tweet-text").val();
    const tweetLength = tweetText.length;

    // Error checking
    const valid = validateTweet(tweetLength);
    if (!valid) return;

    // Post tweet
    $.post("/tweets", serializedData).done(() => {
      loadTweets();

      // Reset tweet form
      const counter = "#tweet-text + div output";
      $("#tweet-text").val("").focus();
      $(counter).text("140");
    });
  });

  // Load initial tweets
  loadTweets();
});
