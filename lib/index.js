var dhs = exports;
// core
var url = require('url');
// thirdy
var superagent = require('superagent');
var jsdom = require('jsdom');
// consts
var registryURL = 'https://registry.hub.docker.com';

function searchHandler(keyword, callback) {
  var err = null;
  var out = [];

  keyword = (keyword || '');
  callback = (callback || function searchCallback() {});

  function traverseHandler(errors, window) {
    var $ = window.$;
    var itens = $('.span9 a'); 

    itens.each(function (item) {
      var $item = $(itens[item]);
      var href = $item.attr('href');
      var hasFirstFrag = href.indexOf('u/') > -1;
      var hasSecondFrag = href.indexOf('_/') > -1;
      var hasFragment = (hasFirstFrag || hasSecondFrag);

      if (href && hasFragment) {
        out.push({
          title: href.slice(3),
          href: url.resolve(registryURL, href),
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
