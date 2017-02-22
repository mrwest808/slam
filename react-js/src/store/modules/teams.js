import R from 'ramda';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';
import { camelizeKeys } from 'humps';
import { createFetchAction, fromProps } from '../utils';

/* ---------------------------------- *\
  * Constants
\* ---------------------------------- */
export const FETCH_TEAMS_REQUEST = 'teams/FETCH_REQUEST';
export const FETCH_TEAMS_SUCCESS = 'teams/FETCH_SUCCESS';
export const FETCH_TEAMS_FAILURE = 'teams/FETCH_FAILURE';
export const SELECT_TEAM = 'teams/SELECT';
export const RESET_TEAM = 'teams/RESET';

/* ---------------------------------- *\
  * Action creators
\* ---------------------------------- */
const indexAndCamelCase = R.compose(R.indexBy(R.prop('teamId')), camelizeKeys);

export const fetchTeams = () => createFetchAction({
  endpoint: '/teams',
  normalize: payload => ({
    teams: indexAndCamelCase(payload.teams),
  }),
  types: [ FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS, FETCH_TEAMS_FAILURE ],
});

export const selectTeam = createAction(SELECT_TEAM)
export const resetTeam = createAction(RESET_TEAM)

/* ---------------------------------- *\
  * Selectors
\* ---------------------------------- */
export const selectAllTeams = R.path([ 'teams', 'allTeams' ]);
export const selectSelectedTeam = R.path([ 'teams', 'selectedTeam' ]);

// :: State -> TeamId -> Maybe Team
export const selectTeamById = createSelector(
  [ fromProps('teamId'), selectAllTeams ],
  R.useWith(R.prop, [ R.identity, R.prop('teams') ]),
);

/* ---------------------------------- *\
  * Reducer
\* ---------------------------------- */
const allTeams = handleActions(
  {
    [FETCH_TEAMS_REQUEST]: R.assoc('isFetching', true),
    [FETCH_TEAMS_SUCCESS]: (state, action) => ({
      ...state,
      isFetching: false,
      hasFetched: true,
      teams: action.payload.teams,
    }),
    [FETCH_TEAMS_FAILURE]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
  },
  { isFetching: false, hasFetched: false, error: null, teams: {} },
);

function selectedTeam(state = null, action) {
  switch (action.type) {
    case SELECT_TEAM:
      return action.payload;

    case RESET_TEAM:
      return null;

    default:
      return state;
  }
}

export default combineReducers({ allTeams, selectedTeam });
