import fetch from 'isomorphic-fetch';

export function receivePosts(json) {
  return {
    type: 'RECEIVE_POSTS',
    parks: json
  };
}

export function fetchParks(state) {
  console.log(state);
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/park?state=${state}`)
      .then(req => req.json())
      .then(json => dispatch(receivePosts(json)));
  }
}
