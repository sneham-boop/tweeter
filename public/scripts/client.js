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
      const content = tweet.content;
      $("#tweets-container").prepend($tweet);
    }
  };

  // Get all existing tweets
  const loadTweets = () => {
    $.getJSON("/tweets").done(function (tweets) {
      // Remove old dataset and replace with newest
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  };

  // Calculate true tweet length ignoring URL-encoded notation 
  // from serializing the data.
  const getLength = (data) => {
    if (data === "text=") return 0;

    const regex = /(%\w\w)/gi;
    const filteredData = data.match(regex);

    // Substract 2* the filtered data length to only account
    // for each special character 1 time.
    // Substract 5 for "text=" in the .serialize() response.
    const length = data.length - 2 * filteredData.length - 5;
    return length;
  };

  // New tweet
  $(".tweet-form").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    const length = getLength(data);

    // Tweet validation
    const alertUser = "#alert-user";
    $(alertUser).hide();
    if (length === 0) {
      $(alertUser).slideDown(1000).text("Enter a tweet!");
      return;
    }

    if (length > 140) {
      $(alertUser)
        .text("This string is too long. Shorten to 140 characters.")
        .slideDown(1000);
      return;
    }

    // Tweet good to post
    $.post("/tweets", data).done(() => {
      loadTweets();

      // Reset tweet form
      const counter = "#tweet-text + div output";
      $("#tweet-text").val("");
      $(counter).text("140");
    });
  });

  // Load initial tweets
  loadTweets();
});
