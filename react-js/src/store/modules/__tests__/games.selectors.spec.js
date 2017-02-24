import { values } from 'ramda';
import gamesReducer, {
  FETCH_GAMES_FOR_TEAM_SUCCESS,
  selectGameListForTeam,
} from '../games';

const action = {
  type: FETCH_GAMES_FOR_TEAM_SUCCESS,
  payload: {
    teamId: 'knicks',
    games: {
      'knicks-at-cavs': { eventStartDateTime: '2017-02-24T23:00:00.000Z' },
      'knicks-vs-lakers': { eventStartDateTime: '2017-02-26T21:00:00.000Z' },
    },
  },
};
const gamesState = gamesReducer(undefined, action);
const state = { games: gamesState };

it('selectGameListForTeam returns expected', () => {
  const knicksGameList = selectGameListForTeam(state, { teamId: 'knicks' });
  const cavsGameList = selectGameListForTeam(state, { teamId: 'cavs' });
  const expectedGames = action.payload.games;

  expect(knicksGameList).toBeValidGameList();
  expect(knicksGameList.games).toEqual(expectedGames);
  expect(values(knicksGameList.gamesByDate)).toEqual(values(expectedGames));
  expect(cavsGameList).toBe(undefined);
});

it('selectors are memoized', () => {
  const props = { teamId: 'knicks' };
  expect(selectGameListForTeam).toBeMemoized(state, props);
});
