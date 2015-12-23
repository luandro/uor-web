import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import promiseMiddleware from 'redux-promise-middleware';
import { createFalcorMiddleware } from 'redux-falcor';
import rootReducer from './rootReducer';
import { Model } from 'falcor';

// The falcor model that redux-falcor will query
const falcor = new Model({
  cache: {
     	todos: [
            {
                name: 'get milk from corner store',
                done: false
            },
            {
                name: 'withdraw money from ATM',
                done: true
            }
       	]
  }
});

// Middlewares
const middleware = [promiseMiddleware(), createFalcorMiddleware(falcor)];

export default function (initialState, debugSession) {
	let finalCreateStore
	if(process.env.NODE_ENV !== "production"){
		const DevTools = require('../routes/common/components/DevTools')
		// Include redux devtools
		if (debugSession) {
			// And persist state
			finalCreateStore = compose(
				applyMiddleware(...middleware),
				DevTools.instrument(),
				persistState(debugSession)
			)(createStore);
		} else {
			// Don't persist state
			finalCreateStore = compose(
				applyMiddleware(...middleware),
				DevTools.instrument()
			)(createStore);
		}
	} else {
		finalCreateStore = compose(
			applyMiddleware(...middleware)
		)(createStore);
	}

	const store = finalCreateStore(rootReducer, initialState);

	if(process.env.NODE_ENV !== "production" && module.hot) {
		module.hot.accept('./rootReducer', () =>
			store.replaceReducer(require('./rootReducer'))
		);
	}

	return store;
}
