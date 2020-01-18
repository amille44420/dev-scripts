# @amille/dev-scripts

Bunch of webpack scripts ready to use for node and browser react projects.

## Installation

First add `@amille/dev-tools` into your development dependencies.

```sh
# using npm
npm install --save-dev @amille/dev-tools

# or using yarn
yarn add -D @amille/dev-tools
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
| - setupProxy.js (optional setup proxy file)
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

#### Setup proxy

You may access the `after` and `before` hooks from `webpack-dev-server`
by creating a `setupProxy.js` file at your root directory.

```js
module.exports = {
    after(app, server) {
        // ...
    },
    before(app, server) {
        // ...
    },
};
```
