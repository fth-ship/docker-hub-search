#!/usr/bin/env node
var app = require('commander');
var chalk = require('chalk');
var dhs = require('../lib');
var pkg = require('../package');
var sep = ' ' + ((new Array(50)).join('='));

app
  .version(pkg.version)
  .option('-s, --search [keyword]', 'Search in docker registry an image.')
  .parse(process.argv);

function banner() {
  console.log(chalk.magenta([
    sep, '\n',
    '              Docker registry search', '\n',
    sep, '\n',
  ].join('')));
}

function searchHandler(err, result) {
  banner();

  function resultMapHandler(item) {
    console.log(' [ %s ] - FROM %s\n', chalk.blue(item.href), chalk.cyan(' ' + item.title + ' '));
  }
  result.map(resultMapHandler);

  console.log(chalk.magenta(sep));
  console.log(chalk.magenta(' Total of %s'), chalk.cyan(result.length));
  console.log();
}

if (app.search) {
  dhs.search(app.search, searchHandler);
}
