const fs = require('fs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const hookFile = resolveApp('dev-scripts.hooks.js');

const ensureSlash = (inputPath, needsSlash) => {
    const hasSlash = inputPath.endsWith('/');

    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    }

    if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    }

    return inputPath;
};

const moduleFileExtensions = ['js', 'json', 'jsx'];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(ext => fs.existsSync(resolveFn(`${filePath}.${ext}`)));

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

module.exports = {
    resolveModule,
    ensureSlash,
    moduleFileExtensions,
    appDirectory,
    hookFile,
    resolveApp,
};
