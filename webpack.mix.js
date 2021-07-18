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

mix.webpackConfig({
    plugins: [
        new SvgSpritemapPlugin('src/icons/svg/*.svg', {
            output: {
                filename: 'symbol-defs.svg',
                chunk: {
                    keep: true
                },
                svgo: {
                    plugins: [{
                        removeAttrs: {
                            attrs: 'fill'
                        }
                    }]
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
    .setPublicPath('./public')
    .sass('src/scss/plain-ui.scss', 'public/plain-ui.css')
    .purgeCss({
        extend: {
            content: [
                path.join(__dirname, 'public/*.html'),
            ]
        }
    })