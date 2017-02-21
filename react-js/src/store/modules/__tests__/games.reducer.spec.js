import R from 'ramda';
import gamesReducer, {
  FETCH_GAMES_FOR_TEAM_REQUEST,
  FETCH_GAMES_FOR_TEAM_SUCCESS,
  FETCH_GAMES_FOR_TEAM_FAILURE,
} from '../games';

const initialState = gamesReducer(undefined, { type: 'INIT' });

it('returns expected initial state', () => {
  const { allGames, gamesByTeam } = initialState;

  expect(R.type(allGames)).toBe('Object');
  expect(allGames).toBeEmpty();

  expect(R.type(gamesByTeam)).toBe('Object');
  expect(gamesByTeam).toBeEmpty();
});

it('handles FETCH_GAMES_FOR_TEAM_REQUEST action', () => {
  const action = {
    type: FETCH_GAMES_FOR_TEAM_REQUEST,
    payload: { teamId: 'knicks' },
  };
  const state = gamesReducer(initialState, action);
  const { allGames, gamesByTeam } = state;
  const gameList = gamesByTeam[action.payload.teamId];

  expect(gameList).toBeValidGameList();
  expect(gameList.isFetching).toBe(true);
  expect(allGames).toBeEmpty();
});

it('handles FETCH_GAMES_FOR_TEAM_SUCCESS action', () => {
  const action = {
    type: FETCH_GAMES_FOR_TEAM_SUCCESS,
    payload: {
      teamId: 'knicks',
      games: { 'knicks-at-cavs': {}, 'knicks-vs-lakers': {} },
    },
  };
  const state = gamesReducer(initialState, action);
  const { allGames, gamesByTeam } = state;
  const gameList = gamesByTeam[action.payload.teamId];

  expect(gameList).toBeValidGameList();
  expect(allGames).toEqual(action.payload.games);
  expect(gameList.isFetching).toBe(false);
  expect(gameList.hasFetched).toBe(true);
  expect(gameList.gameIds).toEqual(R.keys(action.payload.games));
});

it('handles FETCH_GAMES_FOR_TEAM_FAILURE action', () => {
  const action = {
    type: FETCH_GAMES_FOR_TEAM_FAILURE,
    payload: { teamId: 'knicks', error: new Error('Something went wrong') },
  };
  const state = gamesReducer(initialState, action);
  const { allGames, gamesByTeam } = state;
  const gameList = gamesByTeam[action.payload.teamId];

  expect(gameList).toBeValidGameList();
  expect(gameList.error).toBe(action.payload.error);
  expect(allGames).toBeEmpty();
});
