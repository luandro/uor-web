// Server polyfill
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

function loadData() {
	console.log("Loading data for Home...")
}
function checkAuth() {
	console.log("Checking auth for Home...")
}

module.exports = {
	path: '/home',
	onEnter: loadData(),
	onEnter: checkAuth(),
  	getComponent(location, cb) {
	    require.ensure([], (require) => {
	      cb(null, require('./containers/HomeContainer'))
	    })
	}
}
