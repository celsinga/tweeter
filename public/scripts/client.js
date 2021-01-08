// All code for the script is inside this doc.ready function:

$(document).ready(function() {

  $('.error-message').hide();
  $('.new-tweet').hide();
  // Renders tweets to page
  const renderTweets = function(tweets) {
    for (const obj of tweets) {
      let returnVal = createTweetElement(obj);
      $('.tweets-index').append(returnVal);
    }
  };
  // Escaping function
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Convert Date data
  const dateConverter = function(unix) {
    let date = new Date(unix);
    let fdate = date.getFullYear() + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2);
    return fdate;
  };
  // Create tweet HTML
  const createTweetElement = function(object) {
    const html = `<article>
    <header>
      <span class="header-top">
        <div class="tweet-name"><img src="${object.user.avatars}">&nbsp;${object.user.name}</div>
        <div class="tweet-handle">${object.user.handle}</div>
      </span>
      <span>
        <div class="tweet-content">${escape(object.content.text)}</div>
      </span>
    </header>
    <footer>
      <div class="days-since-post">${dateConverter(object.created_at)}</div>
      <div class="repost-tweet"><img src="./images/finish.png">&nbsp;<img src="./images/process-arrows.png">&nbsp;<img src="./images/heart.png"></div>
    </footer>
  </article>`;
    return $(html);
  };
  
  //AJAX get tweets
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data, err) {
        renderTweets(data);
      }
    });
  };
  loadTweets();
  //AJAX post tweets
  $('.tweet-box').submit(function(evt) {
    evt.preventDefault();
    const input = $('#tweet-text').val();
    if (input.length > 140) {
      $('.error-message').slideDown();
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function() {
        $('.tweets-index').html("");
        loadTweets();
        $('.new-tweet').slideUp();
      },
      error: function() {
        $('.error-message').slideDown();
      }
    });
    $('#tweet-text').val('');
    $('.counter').val('140');
  });
  //Slide error message up after input box click
  const btn = $('#tweet-text');
  btn.on('click', () => {
    $('.error-message').slideUp();
  });

  let newTweetIsDown = false;
  const newTweetBtn = $('.create-tweet-button');

  if (!newTweetIsDown) {
    newTweetBtn.on('click', () => {
      $('.new-tweet').slideDown();
      newTweetIsDown = true;
    });
  }

  if (newTweetIsDown) {
    newTweetBtn.on('click', () => {
      $('.new-tweet').slideUp();
      newTweetIsDown = false;
    });
  }

  // Retween, like, save buttons show on hover of tweet
  // const showRetweetBtns = $('article');
  // showRetweetBtns.on('mouseover', () => {
  //   $('.repost-tweet').show();
  // });

});
