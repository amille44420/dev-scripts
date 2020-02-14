const getEnv = ({ options }) => {
    const { isEnvDevelopment } = options;

    // Grab NODE_ENV and APP_* environment variables and prepare them to be
    // injected into the app using define plugins
    // the prefix APP_* will be stripped
    const envRegex = /^APP_(<name>.+)$/i;

    // initialize the raw environment
    const raw = {};

    // populate it from current environment
    Object.entries(process.env).forEach(([key, value]) => {
        const match = key.match(envRegex);

        if (match) {
            const { name } = match.groups;

            raw[name] = value;
        }
    });

    // stringify it
    const stringified = Object.entries(raw).reduce((env, [key, value]) => {
        // eslint-disable-next-line no-param-reassign
        env[`process.env.${key}`] = JSON.stringify(value);

        return env;
    }, {});

    // add __DEV__ global
    raw.__DEV__ = isEnvDevelopment; // eslint-disable-line no-underscore-dangle
    stringified.__DEV__ = JSON.stringify(isEnvDevelopment); // eslint-disable-line no-underscore-dangle

    return { raw, stringified };
};

module.exports = getEnv;
