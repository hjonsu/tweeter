/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const createTweetElement = function (tweet) {
    const $tweet = $(`<article class="tweet">
    <header class="tweet-header">
      <div class="namePicCombo">
        <div class="avatar">
          <img src=${tweet.user.avatars}>
        </div>
        <h6 class="userName">
          ${tweet.user.name}
        </h6>
      </div>
      <div class="handle">
        ${tweet.user.handle}
      </div>
    </header>
    <p class="tweet-text">
      ${tweet.content.text}
    </p>
    <hr />
    <footer class="tweet-footer">
      <p class="tweet-time">
        ${timeago.format(tweet.created_at)}
      </p>
      <div class="footer-icons">
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
  </article>`);


    return $tweet;
  };



  const renderTweets = function (data) {

    for (let tweet of data) {

      $(`#all-tweets`).prepend(createTweetElement(tweet));
    }
  };

  // event listener for submit
  $("#tweet-form").on('submit', function (event) {
    event.preventDefault();
    let data = $("#tweet-form").serialize();
    let myTweet = $("#tweet-text").val();



    if (myTweet.length > 140) {
      alert("Your tweet is too long!");
      return;
    } else if (myTweet.length === 0) {
      alert("Oops, its empty!");
      return;
    }

    $.ajax({
      method: 'POST',
      data,
      url: '/tweets',
      success: function (response) {
        console.log(response);
      }
    });
  });

  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: "/tweets",
      data: $("tweet-text").serialize(),
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      }

    });
  };
  loadTweets();
});