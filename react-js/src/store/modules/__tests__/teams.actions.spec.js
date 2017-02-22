import R from 'ramda';
import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  SELECT_TEAM,
  RESET_TEAM,
  fetchTeams,
  selectTeam,
  resetTeam,
} from '../teams';

it('exports expected constants', () => {
  [
    FETCH_TEAMS_REQUEST,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE,
    SELECT_TEAM,
    RESET_TEAM,
  ].forEach(actionType => {
    expect(R.type(actionType)).toBe('String');
    expect(actionType).toMatch(/teams\/+/);
  });
});

it('exports expected action creators', () => {
  [ fetchTeams, selectTeam, resetTeam ].forEach(actionCreator => {
    expect(R.type(actionCreator)).toBe('Function');
  });
});

it('fetchGamesForTeam returns a thunk', () => {
  expect(R.type(fetchTeams())).toBe('Function');
});
