This is an ambitious project that aims at creating a boilerplate for [offline-first](https://github.com/pazguille/offline-first) medium/large apps using latest javascript technology.

Uses
[express](https://github.com/strongloop/express/),
[pouchdb](https://github.com/pouchdb/pouchdb),
[falcor](https://github.com/netflix/falcor),
[falcor-express](https://github.com/netflix/falcor-express),
[falcor-router](https://github.com/netflix/falcor-router),
[falcor-http-datasource](https://github.com/netflix/falcor-http-datasource),
[react](https://github.com/facebook/react),
[redux](https://github.com/rackt/redux),
[redux-falcor](https://github.com/ekosz/redux-falcor),
[redux-pouchdb](https://github.com/vicentedealencar/redux-pouchdb),
[redux-simple-router](https://github.com/rackt/redux-simple-router),
[react-router](https://github.com/rackt/react-router),
[react-motion](https://github.com/chenglou/react-motion),
[radium](https://github.com/FormidableLabs/radium),

Development
[babel](https://babeljs.io/),
[webpack](https://webpack.github.io),
[redux-devtools](https://github.com/gaearon/redux-devtools),
[react-transform](https://github.com/gaearon/babel-plugin-react-transform)


## Installation

Make sure you're using Node >= 4.0.0.

```bash
	git clone https://github.com/luandro/uor-web.git
	cd uor-web

	npm install
	npm run dev     # start Express server, webpack-dev-server hot server and PouchDB server

	# production build and run
	NODE_ENV=production npm run build
	NODE_ENV=production npm run start
```

## Usage

Run `npm run dev` in your terminal and play with `routes/common/AppContainer.js` to get a feel of
the server-side rendering and client-side hot updates.


## License

Copy as you like.
