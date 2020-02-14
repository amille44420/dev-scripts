const getSettings = require('../configs/settings');
const getWebpackConfig = require('../configs/webpackNode.config');
const { build } = require('../helpers/build');

const settings = getSettings('node');
const webpackConfig = getWebpackConfig(settings);

build(settings, webpackConfig);
