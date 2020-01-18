#!/usr/bin/env node
const dotenv = require('dotenv');
const chalk = require('react-dev-utils/chalk');
const spawn = require('react-dev-utils/crossSpawn');

// configure dotenv
dotenv.config();

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(x => x === 'build' || x === 'start');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (!process.env.NODE_ENV) {
    console.error(chalk.red('NODE_ENV must be defined'));
    process.exit(1);
}

const scripts = ['start-browser', 'start-node', 'build-browser', 'build-node'];

if (scripts.includes(script)) {
    const result = spawn.sync(
        'node',
        nodeArgs.concat(require.resolve(`../scripts/${script}`)).concat(args.slice(scriptIndex + 1)),
        { stdio: 'inherit' }
    );

    if (result.signal) {
        if (result.signal === 'SIGKILL') {
            console.error(
                chalk.red(
                    'The build failed because the process exited too early. ' +
                        'This probably means the system ran out of memory or someone called ' +
                        '`kill -9` on the process.'
                )
            );
        } else if (result.signal === 'SIGTERM') {
            console.error(
                chalk.red(
                    'The build failed because the process exited too early. ' +
                        'Someone might have called `kill` or `killall`, or the system could ' +
                        'be shutting down.'
                )
            );
        }

        process.exit(1);
    }

    process.exit(result.status);
}

console.error(chalk.red(`Unknown script "${script}".`));
process.exit(1);
