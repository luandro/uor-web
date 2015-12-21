import fetch from 'isomorphic-fetch';
import {
	ITEMS_STORE,
	ITEMS_START_FETCH,
	ITEMS_STOP_FETCH,
} from '../constants';

let api;
if(__CLIENT__) {
const { hostname, port } = window.location;
api = `http://${hostname}:${port}/api`;
}

function receiveItems(fetchedItems) {
	return {
		type: ITEMS_STORE,
		fetchedItems
	};
}

export function startFetching() {
	return {
		type: ITEMS_START_FETCH
	}
}
function stopFetching() {
	return {
		type: ITEMS_STOP_FETCH
	}
}

export function fetchItems(start, end) {
	return function (dispatch) {
		return fetch(api + "/items"+`?_start=${start}&_end=${end}`)
			.then((response) => response.json())
			.then((data) => {
				if (!data || !data.length) {
                	dispatch(stopFetching());
                	return
               	}
				// const fetchedItems = data.map(({ id, title,  }) => ({ id, title,  }));
				dispatch(receiveItems(data));
		})
		.catch((error) => {
	        console.error(error);
	    })

	}
}


