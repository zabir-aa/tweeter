$( document ).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) { // 
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
        ${escape(tweet.content.text)}
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
      $('#tweet-container').prepend($tweet);
    }
  };
  $("#error-element").empty().hide();
  
  $(".new-tweet").hide();

  $("#composeNewTweet").click(function() {
    return $('.new-tweet').toggle("slow").focus();
  });

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const textInput = $('#tweet-text').val();
    if (textInput.trim() === "" || textInput === null) {
      $("#error-element").text("Your post is empty. Are you not humming about anything?").hide().slideDown("slow");
    } else if (textInput.length > 140) {
      $("#error-element").text("That's too large to be a tweet! Tweet within 140 characters please").hide().slideDown("slow");
    } else {
      $.post("/tweets", serializedData)
        .then(loadTweets())
          .then(loadTweets())
            .then(loadTweets());
        $("#error-element").empty().hide();
        $('#tweet-text').val("");
        $("#charCount").val(140);
    }
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        $('#tweet-container').empty()
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error)
      }
    })
  };
  loadTweets();

  var mybutton = document.getElementById("myBtn");

  window.onscroll = function() {scrollFunction()};
  // When the user scrolls down 20px from the top of the document, show the button
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $("#myBtn").css("display", "block");
    } else {
      $("#myBtn").css("display", "none");
    }
  };
  // When the user clicks on the button, scroll to the top of the document
  $("#myBtn").click(function() {
    $("html, body").animate({ scrollTop: "0" });
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
  });

});


