// const { on } = require("nodemon");

$(document).ready(function() {

  $('#tweet-text').on('input', (event) => {
    const inputLength = event.target.value.length;
    const remainingLength = 140 - inputLength;
    const $counter = $('.counter');

    $counter.text(actualLength); //?

    if (remainingLength < 0) {
      $counter.css({ 'color': 'red'});
    }
    if (remainingLength > 0) {
      $counter.css({ 'color': 'black'});
    }
  });
});