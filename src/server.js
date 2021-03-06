/**
 * TODO
 * Make service worker work
 * Add web workers
 */
//Node and Express
import express from "express";
import favicon from "serve-favicon";
import compression from 'compression';
import session from 'express-session'
import path from 'path';
import PrettyError from 'pretty-error';
// React, React-Router for routing, Radium for styles, React-Fetcher for fetching data on the server
import React from "react";
import ReactDOM from "react-dom/server";
import {RoutingContext, match} from "react-router";
import createLocation from "history/lib/createLocation";
import RadiumContainer from './routes/common/components/RadiumContainer';
import { getPrefetchedData } from 'react-fetcher';
// Redux
import { Provider } from 'react-redux';
// Falcor
import FalcorServer from 'falcor-express';
import {createClass} from 'falcor-router';
// Pouchdb
import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));
PouchDB.debug.enable('pouchdb:find');
// Passport
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import localStrategy from 'passport-local';
// Files
import routes from "./routes";
import configureStore from "./models/store";

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const { dispatch } = store;
const initialState = store.getState();
/**
 * Start Express server on port 8000.
 */
const pretty = new PrettyError();
const app = express();
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME || "localhost";
app.listen(port, (error) => {
	if (error) {
		console.error(error);
		return process.exit(3);
	}
	console.info("==> ✅  Server is listening");
	console.info("==> 🌎  Go to http://localhost:%s.", port);
});

/**
 * Attempt to serve static requests from the public folder.
 */
const staticDir = path.join(__dirname,'..','static');
app.use(compression());
app.use(favicon(staticDir + '/favicon.ico'));
app.use(express.static(staticDir));


/**
 * Endpoint that proxies all API requests
 */


/**
 * Catch dynamic requests here to fire-up React Router.
 */
app.get('*', (req, res, err) => {

  	let location = createLocation(req.path);

  	match({routes, location: location}, (error, redirectLocation, renderProps) => {
	    if (redirectLocation) {
	      	res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
	    }
	    else if (error || !renderProps) {
	    	console.error('ROUTER ERROR:', pretty.render(error));
	    	res.status(500);
	    }
	    else {
	    	// Get array of route components:
    		const components = renderProps.routes.map(route => route.component);
    		// Define locals to be provided to all fetcher functions:
		    const locals = {
		    	path: renderProps.location.pathname,
		      	query: renderProps.location.query,
		      	params: renderProps.params,

		      	// Allow fetcher functions to dispatch Redux actions:
		      	dispatch
		    };

		    /**
		     * Prefetch data
		     */
	    	getPrefetchedData(components, locals)
	    	.then(() => {
	    		/**
		    	 * Server-side rendered React root component
		    	 */
				const reactString = ReactDOM.renderToString(
						<Provider store={store}>
							<RadiumContainer radiumConfig={{userAgent: req.headers['user-agent']}}>
								<RoutingContext {...renderProps} />
							</RadiumContainer>
						</Provider>
				);

				/**
				 * Server-side rendered base html
				 */
				const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";

				let output = (
					`<!doctype html>
					<html lang="en-us">
						<head>
							<meta charset="utf-8">
							<title>Universal Offline-First React</title>
							<link rel="shortcut icon" href="/favicon.ico">
						</head>
						<body>
							<div id="react-root">${reactString}</div>
							<div id="tools"></div>
		 				<script>
		 					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
		 				</script>
		 				<script src=${webserver}/dist/main.js></script>
						<script>
					      	/*
					      	if (navigator.serviceWorker) {
					        	navigator.serviceWorker.register('./worker.js', {
					          	scope: './'
					        }).then(function(worker) {
					          	console.log('Yey!', worker);
					        }).catch(function(error) {
					          	console.log('Boo!', error);
					        });
					      }
					      */
					    </script>
		 			</body>
					</html>`
		 		);
		    	res.status(200).send(output);

	    	})
	    }
  });
});
