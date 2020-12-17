/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweets = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@Descartes" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
];

$(document).ready(function() {
  const renderTweets = function(tweets){
    for(const obj of tweets){
      let returnVal = createTweetElement(obj);
      $('.tweets-index').append(returnVal);
    }
  }

  const createTweetElement = function (object) {
    const html = `<article>
    <header>
      <span class="header-top">
        <div class="tweet-name"><img src="${object.user.avatars}">${object.user.name}</div>
        <div class="tweet-handle">${object.user.handle}</div>
      </span>
      <span>
        <div class="tweet-content">${object.content.text}</div>
      </span>
    </header>
    <footer>
      <div class="days-since-post">${object.created_at}</div>
      <div class="repost-tweet">(repost)</div>
    </footer>
  </article>`;
    return $(html);
  }

  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data, err) {
        renderTweets(data);
      }
    });
  }

  $('.tweet-box').submit(function(evt) {
    evt.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function() {
        if (this.data.length > 145) {
          alert("Tweet character limit exceeded. Please keep tweet under 140 characters.");
        } else {
          $('.tweets-index').html("");loadTweets();
        }
      },
      error: function() {
        alert("Tweet contains no content!");
      }
    })
  });
});