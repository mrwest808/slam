import R from 'ramda';

const gameListKeys = [
  'isFetching',
  'hasFetched',
  'error',
  'gameIds',
  'timestamp',
];

const teamListKeys = [
  'isFetching',
  'hasFetched',
  'error',
  'teams',
  'timestamp',
];

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
});
