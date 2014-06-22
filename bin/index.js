var app = require('commander');
var chalk = require('chalk');
var dhs = require('../lib');
var pkg = require('../package');
var sep = ' ' + ((new Array(47)).join('-'));

app
  .version(pkg.version)
  .option('-s, --search [keyword]', 'Search in docker registry an image.')
  .parse(process.argv);

function banner() {
  console.log([
    ' ==============================================', '\n',
    '           Docker registry search', '\n',
    ' ==============================================', '\n',
  ].join(''));
}

function searchHandler(err, result) {
  banner();

  console.log(' Total of %s founded!', chalk.blue(result.length));
  console.log(sep);
  console.log();

  function resultMapHandler(item) {
    console.log(' [ %s ] - %s\n', chalk.blue(item.href), item.title);
  }
  result.map(resultMapHandler);
}

if (app.search) {
  dhs.search(app.search, searchHandler);
}
