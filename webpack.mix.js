const mix = require('laravel-mix')
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin')

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
        new SvgSpritemapPlugin('src/icons/*.svg', {
            output: {
                filename: 'dist/symbol-defs.svg',
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
    .sass('src/scss/plain-ui.scss', 'dist/plain-ui.css')
    .copy('src/fonts/*', 'dist/fonts')
    .options({
        terser: {
            extractComments: false,
        },
        processCssUrls: false
    })