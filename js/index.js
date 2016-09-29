$(document).ready(function() {
  var quote;
  var author;
  var color;
  getQuote();

  $(".quote-container").on("click", function(e) {
    if (e.target.id == "tweet" || $(e.target).parents("#tweet").size()) {
      var url = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' + quote + '" ' + author;
      window.open(url, 'twitter');
    } else {
      getQuote();
      $(".quote-container").addClass("fadeOut");
    }
  });

  $(".generator").on("click", function() {
    getQuote();
    $(".quote-container").addClass("fadeOut");
    $(".generator").addClass("click").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
      $(".generator").removeClass("click");
    });
  });

  function getQuote() {
    var html = "";

    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous', // The URL to the API. 
      type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
      data: {}, // Additional parameters here
      dataType: 'json',
      success: function(data) {

        color = randomColor({
          luminosity: 'dark',
          count: 1
        });
        quote = data.quote;
        author = data.author;
        html += "<blockquote class=\"animated fadeIn\">";
        html += quote;
        html += "<footer class=\"animated fadeIn text-right\"><cite class=\"author\">";
        html += author;
        html += "</cite></footer>";
        html += "</blockquote>";
        html += "<button type=\"button\" class=\"tweet btn btn-default btn-lg col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\" id=\"tweet\"> <i class=\"fa fa-twitter\"> </i> Tweet it!</button>"

        $(".quote-container").addClass("flipInX").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
          $(".quote-container").removeClass("flipInX fadeOut");
        });
        $(".quote-container").html(html);
        $(".quote-container").css("color", color);
        $("blockquote:before").css("color", color);
        $("blockquote footer").css("color", color);
        $("body").css("background-color", color);
        $(".btn").css("color", color);
        $(".generator").removeClass("hidden animated fadeIn");

      },
      error: function(err) {
        alert(err);
      },
      beforeSend: function(xhr) {

        xhr.setRequestHeader("X-Mashape-Authorization", "qjwSY9qW2jmshyjB3c7ZAThTTQSrp1A2pTxjsnt2tW1wSkdeAH"); // Enter here your Mashape key
      }
    });
  }
});