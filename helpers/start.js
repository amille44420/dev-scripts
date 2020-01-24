const { createCompiler } = require('react-dev-utils/WebpackDevServerUtils');
const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const webpack = require('webpack');
const options = require('../configs/options');
const paths = require('../configs/paths');
const { cleanBuild } = require('./build');
const overrideWebpack = require('./overrideWebpack');

const { urls, host, port } = options;

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(paths.appPackageJson);

const isInteractive = process.stdout.isTTY;

const start = (webpackConfig, startServer) => {
    // clean build dir
    cleanBuild();

    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
        appName: pkg.name,
        config: overrideWebpack(webpackConfig),
        urls,
        useYarn: true,
        webpack,
    });

    const server = startServer(compiler);

    // Launch WebpackDevServer.
    const devServer = server.listen(port, host, err => {
        if (err) {
            console.error(err);

            return;
        }

        if (isInteractive) {
            clearConsole();
        }

        console.info(chalk.cyan('Starting the development server...\n'));
        openBrowser(urls.localUrlForBrowser);
    });

    const exit = () => {
        devServer.close();
        process.exit();
    };

    ['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, exit));
};

module.exports = start;
