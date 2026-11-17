const postcssImport = require('postcss-import')
const postcssNested = require('postcss-nested')
const postcssSortMediaQueries = require('postcss-sort-media-queries')
const postcssUrl = require('postcss-url')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    postcssImport(),
    postcssNested(),
    postcssUrl({
      url: 'copy',
      assetsPath: 'assets',
      useHash: true
    }),
    postcssSortMediaQueries(),
    cssnano()
  ],
}
