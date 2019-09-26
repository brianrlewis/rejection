const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    cssModules: true,
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    }
});