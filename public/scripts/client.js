$(document).ready(function() {

  // Function to escape sensitive scripting characters from input text to prevent XSS attacks.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Creates the HTML body of an individual tweet from the tweet object.
  const createTweetElement = function(tweet) {  
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
  };
  //renderTweets: Loops through all tweet data, Creates individual tweets for each, Stacks tweets by prepending.
  const renderTweets = function(tweets) {
    for (const tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweet-container').prepend($tweet);
    }
  };
  // Defaults the hidden property of the error element
  $("#error-element").empty().hide();
  
  // Defaults the hidden property of the tweet compose box
  $(".new-tweet").hide();

  // Toggles the tweet compose box on clicking the 'create new tweet' button on the Nav bar
  $("#composeNewTweet").click(function() {
    return $('.new-tweet').toggle("slow").focus();
  });

  //Tweet form submit event
  $("#tweet-form").submit(function(event) {
    event.preventDefault(); // stop default form submit to run below conditions
    const serializedData = $(this).serialize(); // serialize form data to extract text value
    const textInput = $('#tweet-text').val(); // store text length
    if (textInput.trim() === "" || textInput === null) { // check for empty tweet
      $("#error-element").text("Your post is empty. Are you not humming about anything?").hide().slideDown("slow"); // error element to show for empty tweet
    } else if (textInput.length > 140) { // check for too large tweet
      $("#error-element").text("That's too large to be a tweet! Tweet within 140 characters please").hide().slideDown("slow"); // error element to show for empty tweet
    } else { // when conditions are met
      $.post("/tweets", serializedData) // posts tweet text to /tweets route
        .then(loadTweets()) // renders the tweets on the page 1 time
        .then(loadTweets())  // renders the tweets on the page a 2nd time to avoid failure
        .then(loadTweets());  // renders the tweets on the page a 3rd time to stay on the safe side (tested to be useful)
      $("#error-element").empty().hide(); // Makes sure the error element is hidden after a successful tweet.
      $('#tweet-text').val(""); // empties the tweet compose form
      $("#charCount").val(140); // resets the charachter counter to 140
    }
  });

  // loadTweets: makes an ajax GET call to the /tweets route,
  // empties the tweet container,
  // employs renderTweets function to display all tweets
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        $('#tweet-container').empty();
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };

  loadTweets(); // The initial loadtweets function call to display all tweets at pageload

  // When the user scrolls down 20px from the top of the document, show the scroll to top button
  window.onscroll = function() { 
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $("#myBtn").css("display", "block");
    } else {
      $("#myBtn").css("display", "none");
    }
  };
  
  // When the user clicks on the scroll to top button, scroll to the top of the document
  $("#myBtn").click(function() {
    $("html, body").animate({ scrollTop: "0" });
  });

});


