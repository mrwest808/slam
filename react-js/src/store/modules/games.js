import R from 'ramda';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
import { camelizeKeys } from 'humps';
import { createFetchAction, fromProps } from '../utils';
import { gamesByDate } from '../../utils';

/* ---------------------------------- *\
  * Constants
\* ---------------------------------- */
export const FETCH_GAMES_FOR_TEAM_REQUEST = 'games/FETCH_FOR_TEAM_REQUEST';
export const FETCH_GAMES_FOR_TEAM_SUCCESS = 'games/FETCH_FOR_TEAM_SUCCESS';
export const FETCH_GAMES_FOR_TEAM_FAILURE = 'games/FETCH_FOR_TEAM_FAILURE';

/* ---------------------------------- *\
  * Action creators
\* ---------------------------------- */
const indexAndCamelCase = R.compose(R.indexBy(R.prop('eventId')), camelizeKeys);

export const fetchGamesForTeam = teamId =>
  createFetchAction({
    endpoint: `/teams/${teamId}/games`,
    normalize: payload => ({ games: indexAndCamelCase(payload.games) }),
    payload: { teamId },
    types: [
      FETCH_GAMES_FOR_TEAM_REQUEST,
      FETCH_GAMES_FOR_TEAM_SUCCESS,
      FETCH_GAMES_FOR_TEAM_FAILURE,
    ],
  });

/* ---------------------------------- *\
  * Selectors
\* ---------------------------------- */
export const selectGamesByTeam = R.path([ 'games', 'gamesByTeam' ]);
export const selectAllGames = R.path([ 'games', 'allGames' ]);

// :: State -> TeamID -> Maybe GameList
export const selectGameListForTeam = createSelector(
  [ fromProps('teamId'), selectGamesByTeam, selectAllGames ],
  (teamId, gamesByTeam, allGames) => {
    const gameList = gamesByTeam[teamId];

    if (!gameList) {
      return undefined;
    }

    const games = R.pick(gameList.gameIds, allGames);
    return R.merge(gameList, { games, gamesByDate: gamesByDate(games) });
  },
);

/* ---------------------------------- *\
  * Reducer
\* ---------------------------------- */
const gameList = handleActions(
  {
    [FETCH_GAMES_FOR_TEAM_REQUEST]: R.assoc('isFetching', true),
    [FETCH_GAMES_FOR_TEAM_SUCCESS]: (state, action) => ({
      ...state,
      isFetching: false,
      hasFetched: true,
      gameIds: R.keys(action.payload.games),
    }),
    [FETCH_GAMES_FOR_TEAM_FAILURE]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
  },
  { isFetching: false, hasFetched: false, error: null, gameIds: [] },
);

const gamesByTeam = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GAMES_FOR_TEAM_REQUEST:
    case FETCH_GAMES_FOR_TEAM_SUCCESS:
    case FETCH_GAMES_FOR_TEAM_FAILURE:
      const { teamId } = action.payload;
      return { ...state, [teamId]: gameList(state[teamId], action) };

    default:
      return state;
  }
};

const allGames = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GAMES_FOR_TEAM_SUCCESS:
      const { games } = action.payload;
      return { ...state, ...games };

    default:
      return state;
  }
};

export default combineReducers({ allGames, gamesByTeam });
