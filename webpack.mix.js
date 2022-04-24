const mix = require('laravel-mix')
const path = require('path')
const fs = require('fs')

const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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

const strings = {
    'title'       : 'Plain UI',
    'description' : 'Simple UI Framework for Apps and Websites',
    'version'     : '0.5'
}

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
                svg4everybody: false,
                svgo: {
                    plugins: [{
                        name: 'convertStyleToAttrs',
                        active: true
                    },{
                        name: 'removeStyleElement',
                        active: true
                    }, {
                        name: 'removeAttrs',
                        params: {
                            attrs: 'fill'
                        }
                    }]
                }
            },
            sprite: {
                prefix: 'icon-'
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/html/layout.html.ejs',
            current: 'index.html',
            strings: strings,
            content: fs.readFileSync(__dirname + '/src/html/basics.html'),
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'components.html',
            template: 'src/html/layout.html.ejs',
            current: 'components.html',
            strings: strings,
            content: fs.readFileSync(__dirname + '/src/html/components.html'),
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'layout.html',
            template: 'src/html/layout.html.ejs',
            current: 'layout.html',
            strings: strings,
            content: fs.readFileSync(__dirname + '/src/html/layout.html'),
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'helpers.html',
            template: 'src/html/layout.html.ejs',
            current: 'helpers.html',
            strings: strings,
            content: fs.readFileSync(__dirname + '/src/html/helpers.html'),
            inject: false
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
