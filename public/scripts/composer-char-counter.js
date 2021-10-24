$(document).ready(function() {
  console.log("ready!");

 
  $('#tweet-text').on('input', (event) => {
    const inputLength = event.target.value.length;
    const actualLength = 140 - inputLength;
    const $counter = $('.counter');

    $counter.text(actualLength);

    if (actualLength < 0) {
      $counter.css({ 'color': 'red'});
    }
    if (actualLength > 0) {
      $counter.css({ 'color': 'black'});
    }
  });
});