$( document ).ready(function() {
  
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

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.post("/tweets", serializedData)
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error)
      }
    })
  };
  loadTweets();

  /*
  const $button = $('.container #footer button');
  $button.on('click', function () {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    $.post("/tweets","#tweet-text",console.log("form submitted"));
    });
  */

});


