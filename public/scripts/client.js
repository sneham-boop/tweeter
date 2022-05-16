/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $(".tweet-form").on("submit", (event) => {
    event.preventDefault();
  });

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = (tweetObj) => {
    const user = tweetObj.user;
    const content = tweetObj.content;

    const $tweetElement = `
    <article class="single-tweet">
      <header>
        <div>
          <img src="${user.avatars}">
          <span>${user.name}</span>
        </div>
        <p class="user-id">${user.handle}</p>
      </header>
      <p class="tweet-text-log">${content.text}</p>
      <footer>
        <time>${tweetObj.created_at}</time>
        <div class="interaction-icons-container">
          <a href="#"><i class="flag-icon fa-solid fa-flag"></i></a>
          <a href="#"><i class="retweet-icon fa-solid fa-retweet"></i></i></a>
          <a href="#"><i class="heart-icon fa-solid fa-heart"></i></i></a>
        </div>
      </footer>
    </article>`;
    return $tweetElement;
  };

  const renderTweets = (tweets) => {
    tweets.forEach((tweetData) => {
      const $tweet = createTweetElement(tweetData);
      $("#tweets-container").append($tweet);
    });
  };

  renderTweets(data);
});
