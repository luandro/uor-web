Uses
[express](),
[passport](),
[express-session](),
[pouchdb](),
[pouchdb-find]()*,
[falcor](),
[falcor-express](),
[falcor-router](),
[falcor-http-datasource](?),
[react](),
[redux](),
[redux-promises](?),
[redux-falcor](https://github.com/ekosz/redux-falcor),
[redux-pouchdb](),
[redux-search](),
[redux-simple-router](),
[react-router](),
[react-motion](),
[react-motion-ui-pack](?),
[react-headroom](),
[react-helmet](https://github.com/nfl/react-helmet),
[react-intl](?),
[react-portal](),
[react-map-gl](https://github.com/uber/react-map-gl),
[radium](),

Development
[babel](),
[webpack](),
[webpack-devserver](),
[redux-devtools](),
[react-transform]()


## Installation

Make sure you're using Node >= 4.0.0.

```bash
	git clone https://github.com/luandro/hapi-universal-redux.git
	cd hapi-universal-redux

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
