const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const babelCacheIdentifier = require('./babelCacheIdentifier');
const env = require('./env');
const { isEnvProduction, isEnvDevelopment } = require('./options');
const paths = require('./paths');

const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

    target: 'node',

    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: paths.appIndexJs,

    output: {
        path: paths.appBuild,
        pathinfo: isEnvDevelopment,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },

    resolve: {
        alias: {
            // @server alias
            '@server': paths.appSrc,
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

    module: {
        rules: [
            {
                test: /\.(js|mjs)$/,
                include: paths.appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    configFile: false,
                    presets: [require.resolve('@amille/babel-preset/no-react')],
                    // Make sure we have a unique cache identifier, erring on the
                    // side of caution.
                    cacheIdentifier: babelCacheIdentifier,
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    // See #6846 for context on why cacheCompression is disabled
                    cacheCompression: false,
                    compact: isEnvProduction,
                },
            },
        ],
    },

    plugins: [
        // This gives some necessary context to module not found errors, such as
        // the requesting resource.
        new ModuleNotFoundPlugin(paths.appPath),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV is set to production
        // during a production build.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin(env.stringified),
        // Adds a banner to the top of each generated chunk
        // https://webpack.js.org/plugins/banner-plugin/
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebook/create-react-app/issues/240
        isEnvDevelopment && new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebook/create-react-app/issues/186
        isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    ].filter(Boolean),

    externals: [nodeExternals({ modulesFromFile: true })],

    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

    // Do not replace node globals with polyfills
    // https://webpack.js.org/configuration/node/
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
};

module.exports = config;
