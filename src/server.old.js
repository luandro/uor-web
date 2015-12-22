import {Server} from "hapi";
import h2o2 from "h2o2";
import inert from "inert";
import React from "react";
import ReactDOM from "react-dom/server";
import {RoutingContext, match} from "react-router";
import createLocation from "history/lib/createLocation";
import url from "url";
import parser from 'ua-parser-js';
import { Provider } from 'react-redux';
import configureStore from "./models/store";
import RadiumContainer from './routes/common/components/RadiumContainer';
import routes from "./routes";

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const initialState = store.getState();
/**
 * Start Hapi server on port 8000.
 */
const hostname = process.env.HOSTNAME || "localhost";
const server = new Server();

server.connection({host: hostname, port: process.env.PORT || 8000});

server.register(
	[
		h2o2,
		inert,
		// WebpackPlugin
	],
	(err) => {
	if (err) {
		throw err;
	}

	server.start(() => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
	});
});

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method:  "GET",
	path:    "/{params*}",
	handler: {
		file: (request) => "static" + request.path
	}
});

/**
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
	method: "GET",
	path: "/api/github/{path*}",
	handler: {
		proxy: {
			passThrough: true,
			mapUri (request, callback) {
				callback(null, url.format({
					protocol: "https",
					host:     "api.github.com",
					pathname: request.params.path,
					query:    request.query
				}));
			},
			onResponse (err, res, request, reply, settings, ttl) {
				reply(res);
			}
		}
	}
});


/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
    return reply.continue();
  }

  let location = createLocation(request.path);

  match({routes, location: location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      reply.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    else if (error || !renderProps) {
      reply.continue();
    }
    else {
		const reactString = ReactDOM.renderToString(
				<Provider store={store}>
					<RadiumContainer radiumConfig={{userAgent: request.headers['user-agent']}}>
						<RoutingContext {...renderProps} />
					</RadiumContainer>
				</Provider>
		);

		const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
		const ua = parser(request.headers['user-agent']);

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
    	reply(output);
    }
  });
});
