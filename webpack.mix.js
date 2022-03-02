const mix = require('laravel-mix')
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const path = require('path')

require('laravel-mix-purgecss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */


/**
 *  svgo: {
*     plugins: [{
*         removeAttrs: {
*             attrs: 'fill'
    *     }
    * }]
 *},*
 *  @type {Array}
 */
mix.webpackConfig({
    plugins: [
        new SvgSpritemapPlugin([
                'src/icons/mono-icons/svg/*.svg',
                'src/icons/brands/*.svg'
            ], {
            output: {
                filename: 'symbol-defs.svg',
                chunk: {
                    keep: true
                },
                svg4everybody: false
            },
            sprite: {
                prefix: 'icon-'
            }
        })
    ]
})

mix
    .setPublicPath('./examples')
    .sass('src/scss/plain-ui.scss', 'examples/plain-ui.css')
    .purgeCss({
        extend: {
            content: [
                path.join(__dirname, 'examples/*.html'),
            ]
        }
    })
