const { createElement } = require('react');
const deepForceUpdate = require('react-deep-force-update');
const { render } = require('react-dom');

const bootstrap = (container, App, runtimeModule, props = {}) => {
    let appInstance = null;

    // render core method
    const renderApp = () => {
        try {
            const appElement = createElement(App, props);

            // render it
            appInstance = render(appElement, container);
        } catch (error) {
            // eslint-disable-next-line no-undef
            if (__DEV__) {
                throw error;
            }

            console.error(error);
        }
    };

    // first render
    renderApp();

    // Enable Hot Module Replacement (HMR)
    if (runtimeModule.hot) {
        runtimeModule.hot.accept('./App', () => {
            if (appInstance && appInstance.updater.isMounted(appInstance)) {
                // Force-update the whole tree, including components that refuse to update
                deepForceUpdate(appInstance);
            }

            renderApp();
        });
    }
};

module.exports = bootstrap;
