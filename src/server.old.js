/**
 * TODO
 * Break this file into smaller services:
 * html render
 * react render
 * redux render
 * falcor routes
 */

//Node and Express
import express from "express";
import favicon from "serve-favicon";
import compression from 'compression';
import session from 'express-session'
import path from 'path';
import PrettyError from 'pretty-error';
// Mobile detection
import isMobile from 'ismobilejs';
// React, React-Router for routing, Radium for styles
import React from "react";
import ReactDOM from "react-dom/server";
import {RoutingContext, match} from "react-router";
import createLocation from "history/lib/createLocation";
import RadiumContainer from './routes/common/components/RadiumContainer';
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
 * Initiate Redis
 */
const RedisStore = require('connect-redis')(session);

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
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
			const ua = isMobile(req.headers['user-agent']).any;

			let output = (
				`<!doctype html>
				<html lang="en-us">
					<head>
						<meta charset="utf-8">
						<title>GuiaLa | Chapada dos Veadeiros</title>
						<link rel="shortcut icon" href="/favicon.ico">
					</head>
					<body>
						<div id="react-root">${reactString}</div>
						<div id="tools"></div>
	 				<script>
	 					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
	 					window.__UA__ = ${JSON.stringify(ua)}
	 				</script>
	 				<script src=${webserver}/dist/main.js></script>
	 				<script>
						var WebFontConfig = {
							google: {
						        families: [ 'Ubuntu:400,300' ]
						    },
						    timeout: 2000
						};

						(function(d) {
					      	var wf = d.createElement('script'), s = d.scripts[0];
					      	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
					      	s.parentNode.insertBefore(wf, s);
					   	})(document);
					</script>
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
	    }
  });
});
