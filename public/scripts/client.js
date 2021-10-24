$( document ).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweet">
      <heading>
        <span class = "username">
          <img src="${tweet.user.avatars}"> 
          ${tweet.user.name}
        </span>
        <span class = "handle">
        ${tweet.user.handle}
        </span>
      </heading>
      <p class="tweet">
        ${tweet.content.text}
      </p>
      <footer>
      ${timeago.format(tweet.created_at)}
        <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
    `);
    return $tweet;
  }
  
  const renderTweets = function (tweets) {
    for (const tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweet-container').append($tweet);
    }
  };
  renderTweets(data);

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.post("/tweets", serializedData)
  });

  /*
  const $button = $('.container #footer button');
  $button.on('click', function () {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    $.post("/tweets","#tweet-text",console.log("form submitted"));
    });
  */

});


