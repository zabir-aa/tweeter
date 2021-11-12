$(document).ready(function() {
  
  $('#tweet-text').on('input', (event) => { // activates on input event
    const inputLength = event.target.value.length; // fetches the live input length
    const actualLength = 140 - inputLength; // calculate remaining charachters till 140
    const $counter = $('.counter'); // variable assignment to jQuery element

    $counter.text(actualLength); // assigns remaining charachters value

    if (actualLength < 0) {
      $counter.css({ 'color': 'red'}); // changes counter text color to red if charachters are over 140
    }
    if (actualLength > 0) {
      $counter.css({ 'color': 'black'}); // keeps/reverts back counter text color to black if charachters are under 140
    }
  });
});