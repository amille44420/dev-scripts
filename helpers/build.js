const fs = require('fs');
const rimraf = require('rimraf');
const webpack = require('webpack');
const paths = require('../configs/paths');
const overrideWebpack = require('./overrideWebpack');

const cleanBuild = () => {
    rimraf.sync(paths.appBuild);
    fs.mkdirSync(paths.appBuild);
};

const build = webpackConfig => {
    // clean the build directory
    cleanBuild();

    const promise = new Promise((resolve, reject) =>
        webpack(overrideWebpack(webpackConfig)).run((err, stats) => {
            if (err) {
                return reject(err);
            }

            // print out stats
            console.info(stats.toString(webpackConfig.stats));

            if (stats.hasErrors()) {
                return reject(new Error('Webpack compilation errors'));
            }

            return resolve();
        })
    );

    return promise.catch(err => {
        console.error(err.stack);
        process.exit(1);
    });
};

module.exports = { build, cleanBuild };
