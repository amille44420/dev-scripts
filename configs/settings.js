const fs = require('fs');
const originalHooks = require('../helpers/hooks');
const getEnv = require('./env');
const getOptions = require('./options');
const { getPaths, hookFile } = require('./paths');

if (fs.existsSync(hookFile)) {
    // import it so it can be executed
    require(hookFile);
}

const getSettings = target => {
    const hooks = originalHooks.cloneForTarget(target);
    const settings = { target, hooks };

    settings.options = hooks.overrideOptions(getOptions(settings), settings);
    settings.env = hooks.overrideEnv(getEnv(settings), settings);
    settings.paths = hooks.overridePaths(getPaths(settings), settings);

    return hooks.overrideSettings(settings);
};

module.exports = getSettings;
