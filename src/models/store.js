import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function (initialState, debugSession) {
	let finalCreateStore
	if(process.env.NODE_ENV !== "production"){
		const DevTools = require('../routes/common/components/DevTools')
		// Include redux devtools
		if (debugSession) {
			// And persist state
			finalCreateStore = compose(
				applyMiddleware(thunk),
				DevTools.instrument(),
				persistState(debugSession)
			)(createStore);
		} else {
			// Don't persist state
			finalCreateStore = compose(
				applyMiddleware(thunk),
				DevTools.instrument()
			)(createStore);
		}
	} else {
		finalCreateStore = compose(
			applyMiddleware(thunk)
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
