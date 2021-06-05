module.exports = {
    entry: [
        './server.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    }
}