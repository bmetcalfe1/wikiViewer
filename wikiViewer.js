$(document).ready(function() {

  var currentQuote = '';
  var currentAuthor = '';
  if (!($('.quote-box').hasClass('hide')) )  {
    $('.quote-box').addClass('hide');
  }

  function openURL(url){
    window.open(url);
  }

  function getQuote() {
    if ( !($('.search-box').hasClass('hide')) )  {
      $('.search-box').addClass('hide');
    }
    if ($('.quote-box').hasClass('hide'))  {
      $('.quote-box').removeClass('hide');
    }
    if ( !($('.article-box').hasClass('hide')) )  {
      $('.article-box').addClass('hide');
    }
    $.ajax({
      headers: {
        "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
      success: function(response) {
        var r = JSON.parse(response);
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

  function searchWiki(search) {
    if ( !($('.quote-box').hasClass('hide')) ) {
      $('.quote-box').addClass('hide');
    }
    if ($('.search-box').hasClass('hide')) {
      $('.search-box').removeClass('hide');
    }
    if ( !($('.article-box').hasClass('hide')) ) {
      $('.article-box').addClass('hide');
    }
    var userSearch = '';
    userSearch += search.target.value;
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid='; //not in use
    $.ajax({
        type: "GET",
        url: api + userSearch + cb,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (data) {
          var html = "";
          if (data.query === undefined) {
            // swal("No results found!");
            html += "<div class='search-error'><p>Your search <span class='keyword'>" + userSearch + "</span> did not match any results.</p> <p>Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div>";
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
            for (i = 0; i < titles.length; i++) {
              html += '<div class="search-entry">'
                html += '<div class="search-title">';
                html += titles[i];
                html += '</div><div class="search-body">';
                html += extracts[i]
                html += '</div>'
              html += '</div>'
            }
          } // else
          $('.search-box').html(html);
          if ( !($('.article-box').hasClass('hide')) ) {
            $('.article-box').addClass('hide');
          }
        },
        error: function (errorMessage) {
          console.log(errorMessage);
        }
    }); //ajax
  } //searchWiki function

  function articleShow() {
    if ( !($('.quote-box').hasClass('hide')) ) {
      $('.quote-box').addClass('hide');
    }
    if ( !($('.search-box').hasClass('hide')) )  {
      $('.search-box').addClass('hide');
    }
    if ($('.article-box').hasClass('hide')) {
      $('.article-box').removeClass('hide');
    }
    var clickedArticle = $(this).text();
    var underscoreArticle = clickedArticle.replace(/ /g,"_");
    $.ajax({
      type: "GET",
      url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + underscoreArticle +  "&callback=?",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {

        var markup = data.parse.text["*"];
        var blurb = $('<div></div>').html(markup);
        $('.article-box').html($(blurb).find('p'));

      },
      error: function (errorMessage) {
        console.log(errorMessage);
      }
    }); //ajax
  } //articleShow

  $('#random-quote').on('click', getQuote);
  $('#quote-wiki').on('click', quoteWiki);
  $('#random-wiki').on('click', randomWiki);
  $('#microscope').on('click', getSearch);
  $("#search-wiki").on('search', searchWiki);
  $(document).on("click",".search-title", articleShow);

}); //doc ready

// TO DO 
// eorror message if no article returned - do article by page id number instead of name to reduce errors?
// embed random wiki
// remove a href's in articles
// switch from search to random shows old for half second. 
// download/email pdfs?
