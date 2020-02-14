const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { appBuild } = require('../configs/paths');
const getSettings = require('../configs/settings');
const getWebpackConfig = require('../configs/webpackNode.config');
const start = require('../helpers/start');

const serverPath = path.resolve(appBuild, 'server.js');

const settings = getSettings('node');
const webpackConfig = getWebpackConfig(settings);

const startServer = compiler => {
    // create promise on the compilation
    compiler.hooks.done.tap('server', stats => {
        // print out stats
        console.info(stats.toString(webpackConfig.stats));
    });

    let server; // server instance will remain here
    let serverPromise; // promise resolving the server
    let serverResolve; // resolve callback of the same promise
    let serverIsResolved = true; // has the promise been resolved already

    // listen on the server compilations
    compiler.hooks.compile.tap('server', () => {
        if (!serverIsResolved) {
            // it has not been resolved so nothing to do yet
            return;
        }

        // inform we have not resolved instance
        serverIsResolved = false;

        // set the resolve callback as apiPromiseResolve and save the promise itself as apiPromise
        // eslint-disable-next-line no-return-assign
        serverPromise = new Promise(resolve => (serverResolve = resolve));
    });

    // watch the server compiler
    compiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            try {
                // we cannot apply the update so we will reload the whole server
                // but first delete the node cache
                delete require.cache[require.resolve(serverPath)];

                // now we can get the latest version of our server
                // eslint-disable-next-line global-require, import/no-unresolved
                server = require(serverPath).default;

                console.warn('[\x1b[35mHot Reload\x1b[0m]  Server has been reloaded.');
            } catch (runtimeError) {
                // print the error
                console.error(runtimeError);
            }

            serverIsResolved = true;
            serverResolve();
        }
    });

    // Launch express server.
    const devServer = express();

    devServer.use(async (req, res, next) => {
        try {
            await serverPromise;
            server.handle(req, res);
        } catch (error) {
            next(error);
        }
    });

    return devServer;
};

start(settings, webpackConfig, startServer);
