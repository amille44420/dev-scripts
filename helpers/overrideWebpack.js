const fs = require('fs');
const { webpackOverrideFile } = require('../configs/paths');

const overrideWebpack = webpackConfig => {
    if (fs.existsSync(webpackOverrideFile)) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const override = require(webpackOverrideFile);

        return override(webpackConfig);
    }

    return webpackConfig;
};

module.exports = overrideWebpack;
