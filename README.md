# @amille/dev-scripts

![npm (tag)](https://img.shields.io/npm/v/@amille/dev-scripts/latest)
![npm (tag)](https://img.shields.io/npm/v/@amille/dev-scripts/next)
![CircleCI](https://img.shields.io/circleci/build/github/amille44420/dev-scripts)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Bunch of webpack scripts ready to use for node and browser react projects.

## Installation

First add `@amille/dev-scripts` into your development dependencies.

```sh
# using npm
npm install --save-dev @amille/dev-scripts

# or using yarn
yarn add -D @amille/dev-scripts
```

You may now move onto the next section related to your needs.

#### Setup for browser projects

You project must follow this setup :

```
| - packages.json
| - /build (output directory)
| - /src (source code)
|   | - index.jsx (bundle entry point)
| - /public (public directory)
|   | - index.html (template file for your bundle html entry)
| - dev-scripts.hooks.js (optional hook file)
```

You may add the following scripts to your owns

```json
{
    "start": "am-scripts start-browser",
    "build": "am-scripts build-browser",
    "build:profile": "yarn build --profile"
}
```

#### Setup for node projects

You project must follow this setup :

```
| - packages.json
| - /build (output directory)
| - /src (source code)
|   | - index.jsx (server entry point)
```

You may add the following scripts to your owns

```json
{
    "start": "am-scripts start-node",
    "build": "am-scripts build-node"
}
```

This configuration has `express` as `peerDependency`.

## Customization

This project may be customize by specifying environment variables.
The scripts will also load environment from env files using `dotenv`.

| name                           | default value | description                                               |
| ------------------------------ | ------------- | --------------------------------------------------------- |
| NODE_ENV                       |               | targeted environment                                      |
| PORT                           | 3000          | Port on which the dev server will listen                  |
| HOST                           | 0.0.0.0       | Host on which the dev server will listen                  |
| IMAGE_INLINE_SIZE_LIMIT        | 10000         | Image size limit for inlining                             |
| HTTPS                          |               | if set to `true`, the dev server will run on HTTPS        |
| APP\_\*                        |               | Environment variables to inject (cf documentation)        |
| DANGEROUSLY_DISABLE_HOST_CHECK |               | if set to `true`, the dev server will disable host checks |

#### Global variables

You may define global variables using environment variables.
Those will be injected with define or interpolate plugins.

In addition of `__DEV__`, all variables which their name start with `APP_` will be use for globals.
The prefix `APP_` will be stripped.

You may use them in your html entry file with the following syntax

```html
<p>my global is %NAME%</p>
```

or in your javascript files

```js
console.log(`my global is ${process.env.NAME}`);
```

### Override

This package comes with many available hooks to override configurations at specific key points.
To setup hooks you simply need to create a file `dev-scripts.hooks.js` at your root directory.

```js
const hooks = require('@amille/dev-scripts/helpers/hooks');

/* for all hooks, "any" can be replaced by "node" or "browser" to run on specific build target */

/* overrideOptions, overrideEnv & overridePaths allows you to override settings */

hooks.any.overrideOptions((options, settings) => {
    // options must be returned
    return options;
});

hooks.any.overrideEnv((env, settings) => {
    // env must be returned
    return env;
});

hooks.any.overridePaths((paths, settings) => {
    // paths must be returned
    return paths;
});

/* overrideSettings allows to override the whole settings object */

hooks.any.overrideSettings(settings => {
    // settings must be returned
    return settings;
});

/* overrideWebpack allows to override the whole webpack config */

hooks.any.overrideWebpack((webpackConfig, settings) => {
    // webpackConfig must be returned
    return webpackConfig;
});

/* setupProxyOnBefore & setupProxyOnAfter are helpful to setup proxies in react web dev servers lifecycle */

hooks.any.setupProxyOnBefore((app, server, settings) => {
    /* ... */
});

hooks.any.setupProxyOnAfter((app, server, settings) => {
    /* ... */
});
```

#### Hot reload entry point

The hot reload for browser apps is based on `react-deep-force-updates`.
Setup your entry point as the following example.

```js
import { createElement } from 'react';
// react-deep-force-update will be nullify by null-loader for production
// so we can safely use it for development
// eslint-disable-next-line import/no-extraneous-dependencies
import deepForceUpdate from 'react-deep-force-update';
import { render } from 'react-dom';
// import your app component
import App from './App';

// the query selector must match the one from your html entry point
const container = document.querySelector('#root');

let appInstance = null;

// render core method
const renderApp = () => {
    try {
        // we instance our react element
        const appElement = createElement(App, {});
        // render it and get back the instance
        appInstance = render(appElement, container);
    } catch (error) {
        if (__DEV__) {
            // for development we throw the errors back
            throw error;
        }

        // and print errors in console anyway
        console.error(error);
    }
};

// first rendering
renderApp();

if (module.hot) {
    // hot reload module is here, meaning it is development
    // we listen for all changes in our app
    module.hot.accept('./App', () => {
        if (appInstance && appInstance.updater.isMounted(appInstance)) {
            // Force-update the whole tree, including components that refuse to update
            deepForceUpdate(appInstance);
        }

        renderApp();
    });
}
```
