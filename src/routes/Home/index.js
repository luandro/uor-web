// Server polyfill
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

function loadData() {
	console.log("Load data?");
}
function checkAuth() {
	console.log("Checking auth for Home...")
}

module.exports = {
	path: '/home',
	onEnter: loadData(),
	onEnter: checkAuth(),
	component: require('./containers/HomeContainer')
 //  	getComponent(location, cb) {
	//     require.ensure([], (require) => {
	//       cb(null, require('./containers/HomeContainer'))
	//     })
	// }
}
