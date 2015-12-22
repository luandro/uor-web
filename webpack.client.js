var webpack = require("webpack");
var path = require("path");

// entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
//     if (fs.statSync(path.join(__dirname, dir)).isDirectory())
//       entries[dir] = path.join(__dirname, dir, 'app.js')

//     return entries
//   }, {}),

module.exports = {
	target:  "web",
	cache:   false,
	context: __dirname,
	devtool: false,
	entry:   ["./src/client"],
	output:  {
		path:          path.join(__dirname, "static/dist"),
		filename:      "[name].js", //change to hash
		chunkFilename: "[name].[id].js",
		publicPath:    "dist/"
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin('shared.js'),
		new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	],
	module:  {
		loaders: [
			{test: /\.json$/, loaders: ["json"]},
			{include: /\.js$/, loaders: ["babel-loader?stage=0&optional=runtime"], exclude: /node_modules/}
			// {test: /\.js$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0"], exclude: /node_modules/}
		],
		postLoaders: [],
		noParse: /\.min\.js/
	},
	resolve: {
		alias: {
			react: path.join(__dirname, "node_modules/react")
		},
		modulesDirectories: [
			"src",
			"node_modules",
			"web_modules"
		],
		extensions: ["", ".json", ".js"]
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
};
