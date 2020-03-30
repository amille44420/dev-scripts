const TerserPlugin = require('terser-webpack-plugin');

const getTerser = isEnvProductionProfile =>
    new TerserPlugin({
        // This is only used in production mode
        terserOptions: {
            parse: {
                // We want terser to parse ecma 8 code. However, we don't want it
                // to apply any minification steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the 'compress' and 'output'
                // sections only apply transformations that are ecma 5 safe
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
            },
            compress: {
                ecma: 5,
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
                // Disabled because of an issue with Terser breaking valid code:
                // https://github.com/facebook/create-react-app/issues/5250
                // Pending further investigation:
                // https://github.com/terser-js/terser/issues/120
                inline: 2,
            },
            mangle: {
                safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
            },
        },
        sourceMap: true,
    });

module.exports = getTerser;