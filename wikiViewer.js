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

  function getSearch() {
    if ($('input').hasClass('hide')) {
      $('input').removeClass('hide');
    }
    else {
      $('input').addClass('hide');
    }
  }

  // function searchWiki(search) {
  //   var userSearch = '';
  //   userSearch += search.target.value;
  //   console.log(userSearch);
  //   var searchUrl = 'https://en.wikipedia.org/wiki/' + userSearch.trim().replace(/\s/g, '_');
  //   console.log(userSearch);
  //   openURL(searchUrl);
  // }

  function searchWiki(search) {
    if ( !($('.quote-box').hasClass('hide')) )  {
      $('.quote-box').addClass('hide');
    }
    var userSearch = '';
    userSearch += search.target.value;
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';

    $.ajax({
        type: "GET",
        url: api + userSearch + cb,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function (data) {
          if (data.query === undefined) {
            swal("No results found!");
          }
          else {
            var pages = data.query.pages;
            var titles = [];
            var extracts = [];
            var pageids = [];
            for (var key in pages) {
              titles.push(pages[key].title);
              extracts.push(pages[key].extract);
              pageids.push(pages[key].pageid);
            }
            var html = "";
            for (i = 0; i < titles.length; i++) {
              html += '<div class="search-entry">'
              html += '<div class="search-title"><a href="https://en.wikipedia.org/?curid=';
              html += pageids[i];
              html += '">'
              html += titles[i];
              html += '</a></div><div class="search-body">';
              html += extracts[i]
              html += '</div>'
              html += '</div>'
            }
            $(".search-box").html(html);
          }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });

  } //searchWiki function

  $('#random-quote').on('click', getQuote);
  $('#quote-wiki').on('click', quoteWiki);
  $('#random-wiki').on('click', randomWiki);
  $('#microscope').on('click', getSearch);
  $("#search-wiki").on('search', searchWiki);

  // CALLS********//
    getQuote();
  //**************//

});
