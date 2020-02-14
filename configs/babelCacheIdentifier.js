const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const getBabelCacheIdentifier = options => {
    const { isEnvDevelopment, isEnvProduction } = options;
    const env = isEnvProduction ? 'production' : isEnvDevelopment && 'development';

    return getCacheIdentifier(env, [
        'babel-plugin-named-asset-import',
        '@amille/babel-preset',
        'react-dev-utils',
        '@amille/webpack-scripts',
    ]);
};

module.exports = getBabelCacheIdentifier;
