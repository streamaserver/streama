# AngularJS ui-select [![Build Status](https://travis-ci.org/angular-ui/ui-select.svg?branch=master)](https://travis-ci.org/angular-ui/ui-select)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-ui/ui-select?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

AngularJS-native version of [Select2](http://ivaynberg.github.io/select2/) and [Selectize](http://brianreavis.github.io/selectize.js/).

- [Demo](http://plnkr.co/edit/a3KlK8dKH3wwiiksDSn2?p=preview)
- [Demo Multiselect](http://plnkr.co/edit/juqoNOt1z1Gb349XabQ2?p=preview)
- [Examples](https://github.com/angular-ui/ui-select/blob/master/examples)
- [Documentation](https://github.com/angular-ui/ui-select/wiki)

## Last Changes

- Check [CHANGELOG.md](/CHANGELOG.md)

## Features

- Search, Select, and Multi-select
- Themes: Bootstrap, Select2 and Selectize
- Keyboard support
- jQuery not required (except for old browsers)
- Small code base: 4.57KB min/gzipped vs 20KB for select2

For the roadmap, check [issue #3](https://github.com/angular-ui/ui-select/issues/3) and the [Wiki page](https://github.com/angular-ui/ui-select/wiki/Roadmap).


## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g bower gulp`
* Install local dev dependencies: `npm install && bower install` in repository directory

### Development Commands

* `gulp` to jshint, build and test
* `gulp build` to jshint and build
* `gulp test` for one-time test with karma (also build and jshint)
* `gulp watch` to watch src files to jshin, build and test when changed

## Contributing

- Run the tests
- Try the [examples](https://github.com/angular-ui/ui-select/blob/master/examples)

When issuing a pull request, please exclude changes from the "dist" folder to avoid merge conflicts.
