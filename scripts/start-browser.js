const WebpackDevServer = require('webpack-dev-server');
const getSettings = require('../configs/settings');
const getDevServerConfig = require('../configs/webpackDevServer.config');
const getWebpackConfig = require('../configs/webpackReact.config');
const start = require('../helpers/start');

const settings = getSettings('browser');
const webpackConfig = getWebpackConfig(settings);
const webpackDevServerConfig = getDevServerConfig(settings);

const startServer = compiler => new WebpackDevServer(compiler, webpackDevServerConfig);

start(settings, webpackConfig, startServer);
