import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './common/containers/AppContainer';
import Home from './Home/containers/HomeContainer';

/**
 * Require.ensure fix for server-side
 */
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

/**
 * Authentication login
 */
function checkAuth() {
	console.log("Logged")
}


/**
 * The React Routes for both the server and the client.
 */
// export default (
// 	<Route component={App} onEnter={checkAuth()}>
// 		<Route path="/" component={Home} />
// 	</Route>
// );
// export default  {
//   component: require('./common/components/App'),

module.exports = {
  component: 'div',
  onEnter: checkAuth(),
  childRoutes: [ {
    path: '/',
    component: require('./common/containers/AppContainer'),
    childRoutes: [
      require('./Home')
    ]
  } ]
}

//SIMPLE ENSURE
// module.exports = {
//   path: '/',
//   getComponent(location, cb) {
//     require.ensure([], (require) => {
//       cb(null, require('./common/containers/AppContainer'))
//     })
//   }
// }


// WITH ENSURE
// export default {
//   path: '/',

//   getComponents(location, callback) {
//     require.ensure([], function (require) {
//       callback(null, require('./common/components/App'))
//     })
//   }
// }
