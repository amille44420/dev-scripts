const WebpackDevServer = require('webpack-dev-server');
const webpackDevServerConfig = require('../configs/webpackDevServer.config');
const webpackConfig = require('../configs/webpackReact.config');
const start = require('../helpers/start');

const startServer = compiler => new WebpackDevServer(compiler, webpackDevServerConfig);

start(webpackConfig, startServer);
