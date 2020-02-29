const fs = require('fs');
const { builtinModules } = require('module');
const path = require('path');

const pluginName = 'WebpackPackagePlugin';

const getParentIdentifier = identifier => {
    if (identifier[0] === '@') {
        return identifier
            .split('/')
            .slice(0, 2)
            .join('/');
    }

    return identifier.split('/')[0];
};

const defaultOptions = {
    additionalModules: [],
    packageJson: null,
    packageContent: {},
};

class WebpackPackagePlugin {
    constructor(options) {
        this.options = { ...defaultOptions, ...options };

        const { packageJson } = this.options;

        if (!packageJson) {
            throw new Error('packageJson file must be provided.');
        }

        if (!fs.existsSync(packageJson)) {
            throw new Error(`${packageJson} file not found.`);
        }

        // eslint-disable-next-line import/no-dynamic-require, global-require
        this.package = require(packageJson);
    }

    apply(compiler) {
        const outputFolder = compiler.options.output.path;
        const outputFile = path.resolve(outputFolder, 'package.json');
        const outputName = path.relative(outputFolder, outputFile);

        compiler.hooks.emit.tap(pluginName, compilation => {
            const dependencies = {};

            const addDependency = module => {
                // avoid core package
                if (!builtinModules.includes(module)) {
                    // look for a match
                    const target = this.package.dependencies[module];

                    if (!target) {
                        // we fail if the dependencies is not added in the package.json
                        throw new Error(`the module ${module} is not listed in dependencies`);
                    }

                    // add the dependency
                    dependencies[module] = target;
                }
            };

            compilation.modules.forEach(({ request, external }) => {
                // we only look for external modules
                if (external && !request.startsWith('./')) {
                    // get the main module identifier and try to add i
                    addDependency(getParentIdentifier(request));
                }
            });

            // add additional dependencies
            this.options.additionalModules.forEach(addDependency);

            // write the new package.json
            const output = JSON.stringify(
                {
                    ...this.options.packageContent,
                    dependencies,
                },
                null,
                '\t'
            );

            // add it through webpack assets
            // eslint-disable-next-line no-param-reassign
            compilation.assets[outputName] = {
                source: () => output,
                size: () => output.length,
            };
        });
    }
}

module.exports = WebpackPackagePlugin;
