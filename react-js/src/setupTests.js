import R from 'ramda';
import { createSelector } from 'reselect';

const gameListKeys = [ 'isFetching', 'hasFetched', 'error', 'gameIds' ];

const teamListKeys = [ 'isFetching', 'hasFetched', 'error', 'teams' ];

expect.extend({
  toBeValidGameList(received) {
    const hasKey = key => R.has(key, received);
    const pass = R.all(hasKey, gameListKeys);
    const input = JSON.stringify(received);

    if (pass) {
      return {
        pass: true,
        message: () => `expected ${input} to not be a valid game list`,
      };
    }

    return {
      pass: false,
      message: () => `expected ${input} to be a valid game list`,
    };
  },
  toBeValidTeamList(received) {
    const hasKey = key => R.has(key, received);
    const pass = R.all(hasKey, teamListKeys);
    const input = JSON.stringify(received);

    if (pass) {
      return {
        pass: true,
        message: () => `expected ${input} to not be a valid team list`,
      };
    }

    return {
      pass: false,
      message: () => `expected ${input} to be a valid team list`,
    };
  },
  toBeEmpty(received) {
    const input = JSON.stringify(received);

    if (R.isEmpty(received)) {
      return { pass: true, message: () => `expected ${input} to not be empty` };
    }

    return { pass: false, message: () => `expected ${input} to be empty` };
  },
  toBeMemoized(receivedSelector, state, props) {
    let i = 0;
    const select = createSelector(receivedSelector, value => {
      i++;
      return value;
    });

    select(state, props);
    select(state, props);

    if (i === 1) {
      return {
        pass: true,
        message: () =>
          'expected selector to not return memoized result when called with same arguments',
      };
    }

    return {
      pass: false,
      message: () =>
        'expected selector to return memoized result when called with same arguments',
    };
  },
});
