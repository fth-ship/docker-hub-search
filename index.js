var app = require('commander');
var dhs = require('./lib');
var pkg = require('./package');

app
  .version(pkg.version)
  .option('-s, --search [keyword]', 'Search in docker registry an image.')
  .parse(process.argv);

function searchHandler(err, result) {
  console.log('total of %s', result.length);
  result.map(console.log.bind(console));
}

if (app.search) {
  dhs.search(app.search, searchHandler);
}
