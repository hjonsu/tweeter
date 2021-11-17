$(document).ready(function () {

  console.log("from inside composer char");
  $('#tweet-text').keyup(function () {
    const textLength = $(this).val().length;
    const charCount = 140 - textLength;

    if (charCount < 0) {
      $('.counter').css('color', '#FF0000');

    }
    $('.counter').html(charCount);
  });

});