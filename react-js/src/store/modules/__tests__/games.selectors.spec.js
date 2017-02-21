import R from 'ramda';
import { createSelector } from 'reselect';
import gamesReducer, {
  FETCH_GAMES_FOR_TEAM_SUCCESS,
  selectGameListForTeam,
  selectGamesForTeam,
} from '../games';

const action = {
  type: FETCH_GAMES_FOR_TEAM_SUCCESS,
  payload: {
    teamId: 'knicks',
    games: { 'knicks-at-cavs': {}, 'knicks-vs-lakers': {} },
  },
};
const gamesState = gamesReducer(undefined, action);
const state = { games: gamesState };

it('selectGameListForTeam returns expected', () => {
  const knicksGameList = selectGameListForTeam(state, { teamId: 'knicks' });
  const cavsGameList = selectGameListForTeam(state, { teamId: 'cavs' });

  expect(knicksGameList).toBeValidGameList();
  expect(cavsGameList).toBe(undefined);
});

it('selectGamesForTeam returns expected', () => {
  const knicksGames = selectGamesForTeam(state, { teamId: 'knicks' });
  const cavsGames = selectGamesForTeam(state, { teamId: 'cavs' });

  expect(knicksGames).toEqual(action.payload.games);
  expect(cavsGames).toBe(undefined);
});

it('selectors are memoized', () => {
  const assertMemoized = (selector, state, props) => {
    let i = 0;
    const select = createSelector(selector, value => {
      i++;
      return value;
    });

    select(state, props);
    select(state, props);

    expect(i).toBe(1);
  };

  assertMemoized(selectGameListForTeam, state, { teamId: 'knicks' })
  assertMemoized(selectGamesForTeam, state, { teamId: 'knicks' })
});
