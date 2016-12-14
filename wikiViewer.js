$(document).ready(function() {

  var currentQuote = '';
  var currentAuthor = '';

  function openURL(url){
    window.open(url);
  }

  function getQuote() {
    $.ajax({
      headers: {
        "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
      success: function(response) {
        var r = JSON.parse(response);
        //console.log(r);
        currentQuote = r.quote;
        currentAuthor = r.author;
        $('#text').text(r.quote);
        $('#author').html(r.author);
      }
    });
  }

  function quoteWiki() {
    var quoteUrl = 'https://en.wikipedia.org/wiki/' + currentAuthor.trim().replace(/\s/g, '_');
    openURL(quoteUrl);
  }

  function randomWiki() {
    var randomUrl = 'https://en.wikipedia.org/wiki/Special:Random';
    openURL(randomUrl);
  }

  function searchWiki(search) {
    var userSearch = '';
    userSearch += search.target.value;
    console.log(userSearch);
    var searchUrl = 'https://en.wikipedia.org/wiki/' + userSearch.trim().replace(/\s/g, '_');
    console.log(userSearch);
    openURL(searchUrl);
  }

  $('#new-quote').on('click', getQuote);
  $('#quote-wiki').on('click', quoteWiki);
  $('#random-wiki').on('click', randomWiki);
  $("#search-wiki").on('search', searchWiki);

  // CALLS********//
    getQuote();
  //**************//

});
