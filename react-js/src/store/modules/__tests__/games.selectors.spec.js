import gamesReducer, {
  FETCH_GAMES_FOR_TEAM_SUCCESS,
  selectGameListForTeam,
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
  const expectedGames = action.payload.games;

  expect(knicksGameList).toBeValidGameList();
  expect(knicksGameList.games).toEqual(expectedGames);
  expect(cavsGameList).toBe(undefined);
});

it('selectors are memoized', () => {
  const props = { teamId: 'knicks' };
  expect(selectGameListForTeam).toBeMemoized(state, props);
});
