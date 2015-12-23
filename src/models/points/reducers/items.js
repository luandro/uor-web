import Immutable from 'immutable';
import {
	ITEMS_STORE, ITEMS_START_FETCH,
	ITEMS_STOP_FETCH
} from '../constants';

const initialState = new Immutable.List();
// const initialState = {
// 	items: [],
// 	start: 0,
// 	end: 5,
// 	isLoading: false
// };

export default function items(state = initialState, action) {
	switch(action.type) {
		case ITEMS_START_FETCH:
			return state.set({isLoading: true});
		default:
			return initialState;
	}
}
// export default function items(state = initialState, action) {
// 	switch (action.type) {
// 	case ITEMS_STORE:
// 		return Object.assign({}, state, {
// 	        items: state.items.concat(action.fetchedItems),
// 	        start: state.end + 1,
// 	        end: state.end + 6
// 	    })
// 	case ITEMS_START_FETCH:
// 		return Object.assign({}, state, {
// 			isLoading: true
// 		})
// 	case ITEMS_STOP_FETCH:
// 		return Object.assign({}, state, {
// 			isLoading: false
// 		})
// 	default:
// 		return initialState;
// 	}
// }
