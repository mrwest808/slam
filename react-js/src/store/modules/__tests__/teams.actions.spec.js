import R from 'ramda';
import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  fetchTeams,
} from '../teams';

it('exports expected constants', () => {
  [
    FETCH_TEAMS_REQUEST,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE,
  ].forEach(actionType => {
    expect(R.type(actionType)).toBe('String');
    expect(actionType).toMatch(/teams\/+/);
  });
});

it('exports expected action creators', () => {
  expect(R.type(fetchTeams)).toBe('Function');
});

it('fetchGamesForTeam returns a thunk', () => {
  expect(R.type(fetchTeams())).toBe('Function');
});
