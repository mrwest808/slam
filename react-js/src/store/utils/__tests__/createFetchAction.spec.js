import R from 'ramda';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import createFetchAction, { baseUrl } from '../createFetchAction';

const mockStore = configureMockStore([ thunk ]);

it('exports a function that returns a function', () => {
  expect(R.type(createFetchAction)).toBe('Function');

  const action = createFetchAction();
  expect(R.type(action)).toBe('Function');
});

it('triggers fetch request', () => {
  const jsonData = { test: [ 1, 2, 3 ] };
  const endpoint = '/posts/1';

  fetchMock.get(baseUrl + endpoint, jsonData)

  const types = { REQUEST: 'REQUEST', SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' };
  const fetchAction = createFetchAction({ types: R.values(types), endpoint });
  const expectedActions = [
    { type: types.REQUEST, payload: {} },
    { type: types.SUCCESS, payload: jsonData },
  ];

  const store = mockStore({});
  return store.dispatch(fetchAction).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
