import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { falcorReducer } from 'redux-falcor';
import {items} from './points/reducers/';
// import {profile} from './user/reducers/';

const rootReducer = combineReducers({
  items,
  // profile,
  routing: routeReducer,
  entities: falcorReducer
});

export default rootReducer;
