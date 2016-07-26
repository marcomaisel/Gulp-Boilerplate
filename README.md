# Gulp Frontend Boilerplate

========================================

## Features

- [Gulp][gulp]
- [SCSS][scss]
- [Autoprefixer][autoprefixer] for automatic browser prefixes.
- [Browsersync][browsersync] for automatically reloading the page on a local server.
- [CSSNano][cssnano], [UglifyJS][uglifyjs], and [ImageMin][imagemin] for compression.

## Dependencies

[npm][npm-install] must be installed. 

Gulp must be installed:

```bash
npm install -g gulp
```

## Install

After downloading or cloning the repository run

```bash
npm install
```

to set everything up. Also change data in the package.json file to your needs.


## Gulp Commands

```bash
gulp
```

Starts local server with automatic reloading using [Browsersync][browsersync].

```bash
gulp build
```

Builds the site into the `dist` directory.


[autoprefixer]: https://css-tricks.com/autoprefixer/
[browsersync]: http://www.browsersync.io/
[cssnano]: http://cssnano.co/
[gulp]: http://gulpjs.com/
[imagemin]: https://github.com/imagemin/imagemin
[npm-install]: https://nodejs.org/en/download/
[uglifyjs]: https://github.com/mishoo/UglifyJS
[scss]: http://sass-lang.com/
