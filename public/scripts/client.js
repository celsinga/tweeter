// All code for the script is inside this doc.ready function:

$(document).ready(function() {
  // Renders tweets to page
  const renderTweets = function(tweets){
    for(const obj of tweets){
      let returnVal = createTweetElement(obj);
      $('.tweets-index').append(returnVal);
    }
  };
  // Escaping function
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  // Create tweet HTML
  const createTweetElement = function (object) {
    const html = `<article>
    <header>
      <span class="header-top">
        <div class="tweet-name"><img src="${object.user.avatars}">${object.user.name}</div>
        <div class="tweet-handle">${object.user.handle}</div>
      </span>
      <span>
        <div class="tweet-content">${escape(object.content.text)}</div>
      </span>
    </header>
    <footer>
      <div class="days-since-post">${object.created_at}</div>
      <div class="repost-tweet">(repost)</div>
    </footer>
  </article>`;
    return $(html);
  }
  //AJAX get tweets
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data, err) {
        renderTweets(data);
      }
    });
  }
 //AJAX post tweets
  $('.tweet-box').submit(function(evt) {
    evt.preventDefault();
    const input = $('#tweet-text').val()
    if (input.length > 140) {
      alert("Tweet character limit exceeded. Please keep tweet under 140 characters.");
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function() {
        $('.tweets-index').html("").append($("<p></p>"));loadTweets();
      },
      error: function() {
        alert("Tweet contains no content!");
      }
    })
  });
});