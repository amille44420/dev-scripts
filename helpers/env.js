/* eslint-disable global-require */
const fs = require('fs');
const { resolveApp } = require('./paths');

const setup = nodeEnv => {
    // Do this as the first thing so that any code reading it knows the right env.
    process.env.BABEL_ENV = nodeEnv;
    process.env.NODE_ENV = nodeEnv;

    const dotenv = resolveApp('.env');

    // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
    const dotenvFiles = [
        dotenv,
        `${dotenv}.${nodeEnv}`,
        `${dotenv}.${nodeEnv}.local`,
        // Don't include `.env.local` for `test` environment
        // since normally you expect tests to produce the same
        // results for everyone
        nodeEnv !== 'test' && `${dotenv}.local`,
    ].filter(Boolean);

    // Load environment variables from .env* files. Suppress warnings using silent
    // if this file is missing. dotenv will never modify any environment variables
    // that have already been set.  Variable expansion is supported in .env files.
    // https://github.com/motdotla/dotenv
    // https://github.com/motdotla/dotenv-expand
    dotenvFiles.forEach(dotenvFile => {
        if (fs.existsSync(dotenvFile)) {
            require('dotenv-expand')(
                require('dotenv').config({
                    path: dotenvFile,
                })
            );
        }
    });
};

module.exports = setup;
