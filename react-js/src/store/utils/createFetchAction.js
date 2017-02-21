require('es6-promise').polyfill();
import 'isomorphic-fetch';

import R from 'ramda';
import { createAction } from 'redux-actions';

export const baseUrl = 'http://localhost:9999';
const actionWith = (actionType, payload) => createAction(actionType)(payload);

export default fetchOptions => dispatch => {
  const {
    endpoint,
    normalize = R.identity,
    payload = {},
  } = fetchOptions;
  const [ REQUEST, SUCCESS, FAILURE ] = fetchOptions.types;
  const url = R.concat(baseUrl, endpoint);

  dispatch(actionWith(REQUEST, payload));
  return fetch(url).then(async response => {
    const json = await response.json();

    if (!response.ok) {
      return dispatch(actionWith(FAILURE, R.merge(payload, { error: json })));
    }

    return dispatch(actionWith(SUCCESS, R.merge(payload, normalize(json))));
  });
};
