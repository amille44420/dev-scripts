const createHook = hookType => ({
    callbacks: [],
    register(callback, target = null) {
        this.callbacks.push({ callback, target });
    },
    execute(...args) {
        switch (hookType) {
            case 'reduce': {
                const [entity, ...context] = args;

                return this.callbacks.reduce((cleanedEntity, callback) => {
                    return callback(cleanedEntity, ...context);
                }, entity);
            }

            case 'forEach':
            default:
                // run hooks
                this.callbacks.forEach(callback => callback(...args));

                return undefined;
        }
    },
});

const hooks = {
    overrideWebpack: createHook('reduce'),
    overrideOptions: createHook('reduce'),
    overrideEnv: createHook('reduce'),
    overridePaths: createHook('reduce'),
    overrideSettings: createHook('reduce'),
    setupProxyOnAfter: createHook('forEach'),
    setupProxyOnBefore: createHook('forEach'),
};

const createProxy = target => {
    return Object.entries(hooks).reduce((newHooks, [key, hook]) => {
        // eslint-disable-next-line no-param-reassign
        newHooks[key] = callback => hook.register(callback, target);

        return newHooks;
    }, {});
};

module.exports = {
    any: createProxy(null),
    node: createProxy('node'),
    browser: createProxy('browser'),
    cloneForTarget(currentTarget) {
        return Object.entries(hooks).reduce((newHooks, [key, hook]) => {
            const newHook = {
                ...hook,
                callbacks: hook.callbacks
                    .filter(({ target }) => target === null || target === currentTarget)
                    .map(({ callback }) => callback),
            };

            // eslint-disable-next-line no-param-reassign
            newHooks[key] = newHook.execute.bind(newHook);

            return newHooks;
        }, {});
    },
};
