const fs = require('fs');
const path = require('path');
const { resolveModule } = require('../helpers/paths');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const hookFile = resolveApp('dev-scripts.hooks.js');

const getPaths = () => ({
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    yarnLockFile: resolveApp('yarn.lock'),
    proxySetup: resolveApp('setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
});

module.exports = { getPaths, appDirectory, hookFile };
