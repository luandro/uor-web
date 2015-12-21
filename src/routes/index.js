import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './common/containers/AppContainer';
import Home from './Home/containers/HomeContainer';
import MobileNavBar from './common/components/MobileNavBar';

const isMobile = true;
let NavBar;
(isMobile) ? NavBar = <MobileNavBar /> : NavBar = 'Desktop';
/**
 * Authentication login
 */
function checkAuth() {
	console.log("Logged")
}


/**
 * The React Routes for both the server and the client.
 */
export default (
	<Route component={App} onEnter={checkAuth()}>
		<Route path="/" components={Home}>
			<IndexRoute components={{main: Home, nav: MobileNavBar}} />
		</Route>
	</Route>
);
// export default  {
//   component: require('./common/components/App'),
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
