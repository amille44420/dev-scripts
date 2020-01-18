const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');

const webpackEnv = process.env.NODE_ENV;

const isEnvProduction = webpackEnv === 'production';

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = {
    // bundle configuration
    envPublicUrl: '/', // for now only support root serving
    imageInlineSizeLimit: parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000', 10),
    isEnvProductionProfile: isEnvProduction && process.argv.includes('--profile'),
    // style files regexes
    cssRegex: /\.css$/,
    cssModuleRegex: /\.module\.css$/,
    lessRegex: /\.less$/,
    lessModuleRegex: /\.module\.less$/,
    // environments
    isEnvDevelopment: webpackEnv === 'development',
    isEnvProduction,
    // dev web server config
    host,
    port,
    urls: prepareUrls('http', host, port),
    protocol: process.env.HTTPS === 'true' ? 'https' : 'http'
};
