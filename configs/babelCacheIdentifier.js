const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const { isEnvDevelopment, isEnvProduction } = require('./options');

const env = isEnvProduction ? 'production' : isEnvDevelopment && 'development';

const babelCacheIdentifier = getCacheIdentifier(env, [
    'babel-plugin-named-asset-import',
    '@amille/babel-preset',
    'react-dev-utils',
    '@amille/webpack-scripts',
]);

module.exports = babelCacheIdentifier;
