var dhs = exports;
// core
var url = require('url');
// thirdy
var superagent = require('superagent');
var jsdom = require('jsdom');
// consts
var registryURL = 'https://registry.hub.docker.com';

function cleanTitleHandler(title) {
  var out = title;
  var dots = '...';
  var dotsIndex = null;

  out = out.replace(/\n/g, '');
  out = out.replace(/\s/g, '');
  dotsIndex = out.indexOf(dots);
  out = out.slice(0, dotsIndex + dots.length);

  return out;
}
dhs.cleanTitle = cleanTitleHandler;

function searchHandler(keyword, callback) {
  var err = null;
  var out = [];

  keyword = (keyword || '');
  callback = (callback || function searchCallback() {});

  function traverseHandler(errors, window) {
    var $ = window.$;
    var itens = $('.span9'); 

    itens.each(function (item) {
      var $item = $(itens[item]);
      var title = $item.find('.repo-list-item-description h2').text();
      var href = $item.find('a').attr('href');

      if (title && href) {
        out.push({
          title: cleanTitleHandler(title),
          href: href
        });
      }
    });

    callback(errors, out);
  }

  function endHandler(err, res) {
    if (!err) {
      jsdom
        .env(
          res.text,
          ['http://code.jquery.com/jquery.js'],
          traverseHandler
        ); 
    } else {
      callback(err, out);
    }
  }

  if (!keyword) {
    err = 'Keyword should be an value.'; 
    callback(err, out);
  } else {
    superagent
      .get(url.resolve(registryURL, '/search'))
      .query({
        q: keyword
      })
      .end(endHandler);
  }
}
dhs.search = searchHandler;
