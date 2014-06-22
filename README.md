# Docker registry search

Simple tool to scrap from docker registry and search images direct in the terminal.

# Installation

  [sudo] npm i -g dhs

# Usage

  [sudo] dhs -s [keyword]

# Contribution

Under ICS feel free to modify and improve.

# API

## Calling

  var dhs = require('dhs');

## Search

  dhs.search('ubuntu', function (err, result) {
    // do something with the list of results
    // [{
    //    title: 'string',
    //    href: 'string'
    // }]
  });

*.*
