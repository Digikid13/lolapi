lolapi
======

A Node module for League of Legend's API

## Team

  - __Owner__: Justin (Digikid13) Cruz

## Table of Contents

1. [Installation](#installation)
1. [Usage](#Usage)
1. [Team](#team)

### Installation

```
npm install npm-lolapi --save
```

## Usage

```
var api = require('npm-lolapi')({
  key: 'key-here',
  loc: 'na'
});

// API docs comming soon!
api.match.info(1531452956, function(err, data) {
  console.log(err, data);
});
```
