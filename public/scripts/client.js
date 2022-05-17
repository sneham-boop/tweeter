/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = tweetData.content;
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
      <p class="tweet-text-log bold">${content.text}</p>
      <footer>
        <time class="bold">${timeago.format(time)}</time>
        <div class="interaction-icons-container">
          <a href="#"><i class="flag-icon fa-solid fa-flag fa-2xs"></i></a>
          <a href="#"><i class="retweet-icon fa-solid fa-retweet fa-2xs"></i></i></a>
          <a href="#"><i class="heart-icon fa-solid fa-heart fa-2xs"></i></i></a>
        </div>
      </footer>
    </article>`;
    return $tweetElement;
  };

  const renderTweets = (tweets) => {
    // console.log(tweets);
    tweets.forEach((tweetData) => {
      const $tweet = createTweetElement(tweetData);
      $("#tweets-container").append($tweet);
    });
  };

  const loadTweets = () => {
    $.getJSON("/tweets", function (data) {
    })
    .done(function (data) {
      renderTweets(data)
    });
  };
  

  $(".tweet-form").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post("/tweets", data);
  });
  loadTweets();
});
