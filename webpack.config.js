const path = require('path');

module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, "app/public/js/main.js")],
    output: {
	filename: "bundle.js",
	path: path.resolve(__dirname, 'app/public/js/build')
    },
    devtool: "source-map",
    module: { 
	loaders: [
	    {
		test: /\.js$/, 
		exclude: /node_modules/, 
		loader: 'babel-loader', 
		query: {
		    presets: ['react', 'es2015', 'stage-3'] 
		}
	    }
	]
    }
};

