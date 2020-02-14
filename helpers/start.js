const { createCompiler } = require('react-dev-utils/WebpackDevServerUtils');
const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const webpack = require('webpack');
const { cleanBuild } = require('./build');

const isInteractive = process.stdout.isTTY;

const start = (settings, webpackConfig, startServer) => {
    const { options, paths, hooks } = settings;
    const { urls, host, port } = options;

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const pkg = require(paths.appPackageJson);

    // clean build dir
    cleanBuild(settings);

    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
        appName: pkg.name,
        config: hooks.overrideWebpack(webpackConfig, settings),
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
