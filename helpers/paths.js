const fs = require('fs');

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
};
