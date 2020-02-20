const getOptions = () => {
    const env = process.env.NODE_ENV || 'development';
    const isEnvProduction = env === 'production';
    const host = process.env.HOST || '0.0.0.0';
    const port = parseInt(process.env.PORT, 10) || 3000;

    return {
        env,
        // bundle configuration
        envPublicUrl: '/', // for now only support root serving
        imageInlineSizeLimit: parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000', 10),
        isEnvProductionProfile: isEnvProduction && process.argv.includes('--profile'),
        // style files regexes
        cssRegex: /\.css$/,
        cssModuleRegex: /\.module\.css$/,
        lessRegex: /\.less$/,
        lessModuleRegex: /\.module\.less$/,
        // environments
        isEnvDevelopment: env === 'development',
        isEnvProduction,
        // dev web server config
        host,
        port,
        protocol: process.env.HTTPS === 'true' ? 'https' : 'http',
        disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        // experimental feature(s)
        withReactRefresh: false,
    };
};

module.exports = getOptions;
