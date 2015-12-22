/**
 * TODO
 * Break this file into smaller services:
 * html render
 * react render
 * redux render
 * falcor routes
 */
import express from "express";
import favicon from "serve-favicon";
import compression from 'compression';
import path from 'path';
import PrettyError from 'pretty-error';
import parser from 'ua-parser-js';
// React and React-Router
import React from "react";
import ReactDOM from "react-dom/server";
import {RoutingContext, match} from "react-router";
import createLocation from "history/lib/createLocation";
// Redux
import { Provider } from 'react-redux';
import configureStore from "./models/store";
// Radium
import RadiumContainer from './routes/common/components/RadiumContainer';
// Routes file
import routes from "./routes";

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
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
// server.route({
// 	method: "GET",
// 	path: "/api/github/{path*}",
// 	handler: {
// 		proxy: {
// 			passThrough: true,
// 			mapUri (request, callback) {
// 				callback(null, url.format({
// 					protocol: "https",
// 					host:     "api.github.com",
// 					pathname: request.params.path,
// 					query:    request.query
// 				}));
// 			},
// 			onResponse (err, res, request, reply, settings, ttl) {
// 				reply(res);
// 			}
// 		}
// 	}
// });


/**
 * Catch dynamic requests here to fire-up React Router.
 */
app.get('*', (req, res, err) => {
	if(err) {
		console.log("err:", err)
	}
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
			const reactString = ReactDOM.renderToString(
					<Provider store={store}>
						<RadiumContainer radiumConfig={{userAgent: req.headers['user-agent']}}>
							<RoutingContext {...renderProps} />
						</RadiumContainer>
					</Provider>
			);

			const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
			const ua = parser(req.headers['user-agent']);

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
	 			</body>
				</html>`
	 		);
	    	res.status(200).send(output);
	    }
  });
});
