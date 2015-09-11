import { combineReducers } from 'redux';
// import {
//   RECEIVE_POSTS
// } from './actions';

function fetchParks(state = { parks: [] }, action) {
  if (action.type === 'RECEIVE_POSTS') {
    return Object.assign({}, state, {
      parks: action.parks.filter(function(park) {
        return park.lat && park.lng;
      })
    });
  } else {
    return state;
  }
}

const rootReducer = combineReducers({
  fetchParks
});

export default rootReducer;
