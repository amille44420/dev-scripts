const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const { moduleFileExtensions } = require('../helpers/paths');
const babelCacheIdentifier = require('./babelCacheIdentifier');
const { getLessLoaders, getStyleLoaders } = require('./loaders');
const { getTerser, cssOptimize } = require('./optimizers');

const getWebpackConfig = settings => {
    const { paths, options, env } = settings;
    const appPackageJson = require(paths.appPackageJson);

    const {
        isEnvProduction,
        isEnvDevelopment,
        isEnvProductionProfile,
        imageInlineSizeLimit,
        cssModuleRegex,
        cssRegex,
        lessModuleRegex,
        lessRegex,
        withReactRefresh,
    } = options;

    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        entry: [
            // provide hot reload support
            isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
            // Finally, this is your app's code:
            paths.appIndexJs,
        ].filter(Boolean),

        output: {
            // The build folder.
            path: paths.appBuild,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: isEnvDevelopment,
            // There will be one main bundle, and one file per asynchronous chunk.
            // In development, it does not produce real files.
            filename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : isEnvDevelopment && 'static/js/bundle.js',
            // TODO: remove this when upgrading to webpack 5
            futureEmitAssets: true,
            // There are also additional JS chunk files if you use code splitting.
            chunkFilename: isEnvProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : isEnvDevelopment && 'static/js/[name].chunk.js',
            // We inferred the "public path" (such as / or /my-project) from homepage.
            // We use "/" in development.
            publicPath: '/',
            // Prevents conflicts when multiple Webpack runtimes (from different apps)
            // are used on the same page.
            jsonpFunction: `webpackJsonp${appPackageJson.name}`,
            // this defaults to 'window', but by setting it to 'this' then
            // module chunks which are built will work in web workers as well.
            globalObject: 'this',
        },

        resolve: {
            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support
            // some tools, although we do not recommend using it, see:
            // https://github.com/facebook/create-react-app/issues/290
            // `web` extension prefixes have been added for better support
            // for React Native Web.
            extensions: moduleFileExtensions.map(ext => `.${ext}`),

            alias: {
                // Allows for better profiling with ReactDevTools
                ...(isEnvProductionProfile && {
                    'react-dom$': 'react-dom/profiling',
                    'scheduler/tracing': 'scheduler/tracing-profiling',
                }),
                // @app alias
                '@app': paths.appSrc,
            },

            plugins: [
                // Adds support for installing with Plug'n'Play, leading to faster installs and adding
                // guards against forgotten dependencies and such.
                PnpWebpackPlugin,
                // Prevents users from importing files from outside of src/ (or node_modules/).
                // This often causes confusion because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
                // please link the files into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled, as they will not be processed in any way.
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },

        resolveLoader: {
            plugins: [
                // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
                // from the current package.
                PnpWebpackPlugin.moduleLoader(module),
            ],
        },

        module: {
            strictExportPresence: true,
            rules: [
                // Disable require.ensure as it's not a standard language feature.
                { parser: { requireEnsure: false } },

                {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: imageInlineSizeLimit,
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },

                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                presets: [require.resolve('@amille/babel-preset')],
                                // Make sure we have a unique cache identifier, erring on the
                                // side of caution.
                                cacheIdentifier: babelCacheIdentifier,
                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                                },
                                            },
                                        },
                                    ],
                                    isEnvDevelopment && withReactRefresh && require.resolve('react-refresh/babel'),
                                ].filter(Boolean),
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                // See #6846 for context on why cacheCompression is disabled
                                cacheCompression: false,
                                compact: isEnvProduction,
                            },
                        },

                        // "postcss" loader applies autoprefixer to our CSS.
                        // "css" loader resolves paths in CSS and adds assets as dependencies.
                        // "style" loader turns CSS into JS modules that inject <style> tags.
                        // In production, we use MiniCSSExtractPlugin to extract that CSS
                        // to a file, but in development "style" loader enables hot editing
                        // of CSS.
                        // By default we support CSS Modules with the extension .module.css
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    sourceMap: isEnvProduction,
                                },
                                options
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },

                        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                        // using the extension .module.css
                        {
                            test: cssModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 1,
                                    sourceMap: isEnvProduction,
                                    modules: {
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                                options
                            ),
                        },

                        // Opt-in support for LESS
                        // By default we support LESS Modules with the
                        // extensions .module.less
                        {
                            test: lessRegex,
                            exclude: lessModuleRegex,
                            use: getLessLoaders(
                                {
                                    importLoaders: 2,
                                    sourceMap: isEnvProduction,
                                },
                                options
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                        },

                        // Adds support for CSS Modules, but using LESS
                        // using the extension .module.less
                        {
                            test: lessModuleRegex,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 2,
                                    sourceMap: isEnvProduction,
                                    modules: {
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                                options
                            ),
                        },

                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            loader: require.resolve('file-loader'),
                            // Exclude `js` files to keep "css" loader working as it injects
                            // its runtime that would otherwise be processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },

                        // Exclude dev modules from production build
                        !isEnvDevelopment && {
                            test: path.resolve(
                                paths.appNodeModules,
                                'node_modules/react-deep-force-update/lib/index.js'
                            ),
                            loader: 'null-loader',
                        },
                    ].filter(Boolean),
                },
            ],
        },

        plugins: [
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.appHtml,
                ...(isEnvProduction && {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    },
                }),
            }),
            // Inlines the webpack runtime script. This script is too small to warrant
            // a network request.
            // https://github.com/facebook/create-react-app/issues/5358
            isEnvProduction && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
            // In production, it will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            // In development, this will be an empty string.
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            // This gives some necessary context to module not found errors, such as
            // the requesting resource.
            new ModuleNotFoundPlugin(paths.appPath),
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV is set to production
            // during a production build.
            // Otherwise React will be compiled in the very slow development mode.
            new webpack.DefinePlugin(env.stringified),
            // This is necessary to emit hot updates (currently CSS only):
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            // If you require a missing module and then `npm install` it, you still have
            // to restart the development server for Webpack to discover it. This plugin
            // makes the discovery automatic so you don't have to restart.
            // See https://github.com/facebook/create-react-app/issues/186
            isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            isEnvProduction &&
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                }),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how Webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // You can remove this if you don't use Moment.js:
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // React refresh experimental feature
            // https://github.com/pmmmwh/react-refresh-webpack-plugin
            isEnvDevelopment && withReactRefresh && new ReactRefreshWebpackPlugin({ disableRefreshCheck: true }),
        ].filter(Boolean),

        optimization: {
            minimize: isEnvProduction,
            minimizer: [
                // This is only used in production mode
                getTerser(isEnvProductionProfile),
                // This is only used in production mode
                cssOptimize,
            ],

            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
                chunks: 'all',
                name: false,
            },

            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            // https://github.com/facebook/create-react-app/issues/5358
            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`,
            },
        },

        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        node: {
            module: 'empty',
            dgram: 'empty',
            dns: 'mock',
            fs: 'empty',
            http2: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },

        // Turn off performance processing because we utilize
        // our own hints via the FileSizeReporter
        performance: false,
    };
};

module.exports = getWebpackConfig;
