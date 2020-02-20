const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

const getStyleLoaders = (cssOptions, options) => {
    const { isEnvProduction, isEnvDevelopment } = options;

    return [
        // use style loader on development so we can reasily apply hot reload updates
        isEnvDevelopment && require.resolve('style-loader'),
        // on production however we will extract the css
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
        },
        // everything go through the css loader
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                    // Adds PostCSS Normalize as the reset css with default options,
                    // so that it honors browserslist config in package.json
                    // which in turn let's users customize the target behavior as per their needs.
                    postcssNormalize(),
                ],
                // only use source map on production, no need for it on development for such resources
                sourceMap: isEnvProduction,
            },
        },
    ].filter(Boolean);
};

const getLessLoaders = (cssOptions, options) => {
    const { isEnvProduction } = options;

    return [
        ...getStyleLoaders(cssOptions, options),
        {
            loader: require.resolve('resolve-url-loader'),
            options: {
                sourceMap: isEnvProduction,
            },
        },
        {
            loader: require.resolve('less-loader'),
            options: {
                sourceMap: true,
            },
        },
    ];
};

module.exports = { getStyleLoaders, getLessLoaders };
