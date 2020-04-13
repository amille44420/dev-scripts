require('../helpers/env')('production');

const getSettings = require('../configs/settings');
const getWebpackConfig = require('../configs/webpackReact.config');
const { build } = require('../helpers/build');

const settings = getSettings('browser');
const webpackConfig = getWebpackConfig(settings);

build(settings, webpackConfig);
