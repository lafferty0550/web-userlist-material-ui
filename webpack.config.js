const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodemon = require('nodemon');
const webpack = require('webpack');
const rimraf = require('rimraf');

const ENV = process.env.NODE_ENV || 'production';

const _root = path.resolve();
const _src = path.join(_root, '/src');

const _front = path.join(_src, '/front');
const _common = path.join(_src, '/common');
const _back = path.join(_src, '/back');

const _frontEntry = path.join(_front, '/launcher');
const _backEntry = path.join(_back, '/launcher');
const _initEntry = path.join(_src, '/init/init.ts');

const _build = path.join(_root, '/build');
const _output = path.join(_build, '/public');

const aliases = {
    '@front': _front,
    '@actions': path.join(_front, '/actions'),
    '@components': path.join(_front, '/components'),
    '@containers': path.join(_front, '/containers'),
    '@reducers': path.join(_front, '/reducers'),
    '@api': path.join(_front, '/api'),
    '@common': _common
}

const backAliases = {
    '@back': _back,
    '@common': _common
}

rimraf(_output, () => console.log(`=========DELETED=========  ${_output}`));

const cfg = {
    mode: ENV,
    context: _front,
    name: 'front',
    entry: _frontEntry,
    output: {
        path: _output,
        filename: '[hash].bundle.js',
        chunkFilename: '[hash].[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        alias: aliases,
        extensions: ['.ts', '.tsx', '.js']
    }
};

const backcfg = {
    mode: ENV,
    name: 'back',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        back: _backEntry,
        init: _initEntry
    },
    output: {
        path: _build,
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        alias: backAliases,
        extensions: ['.ts']
    }
};

let nodemonIsLaunched = false;
const compiler = webpack([cfg, backcfg]);
const statsHandler = (err, stats) => {
    if (err)
        console.log('webpack:build', err);
    if ((ENV === 'development') && !nodemonIsLaunched) {
        nodemon({
            script: 'build/back.js',
            watch: 'build/back.js'
        }).on('restart', () => {
            process.env.NODEMON_STATUS = 'restarted';
        });
        nodemonIsLaunched = true;
    }
    console.log(stats.toString({
        all: false,
        colors: true,
        errors: true,
        errorDetails: true,
        builtAt: true,
        warnings: true
    }));
}

if (ENV === 'development')
    compiler.watch({}, statsHandler);
else
    compiler.run(statsHandler);


// =============== for webstorm
module.exports = {
    resolve: {
        alias: aliases
    }
};