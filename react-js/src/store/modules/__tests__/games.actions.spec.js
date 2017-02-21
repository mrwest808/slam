import R from 'ramda';
import {
  FETCH_GAMES_FOR_TEAM_REQUEST,
  FETCH_GAMES_FOR_TEAM_SUCCESS,
  FETCH_GAMES_FOR_TEAM_FAILURE,
  fetchGamesForTeam,
} from '../games';

it('exports expected constants', () => {
  [
    FETCH_GAMES_FOR_TEAM_REQUEST,
    FETCH_GAMES_FOR_TEAM_SUCCESS,
    FETCH_GAMES_FOR_TEAM_FAILURE,
  ].forEach(actionType => {
    expect(R.type(actionType)).toBe('String');
    expect(actionType).toMatch(/games\/+/);
  });
});

it('exports expected action creators', () => {
  expect(R.type(fetchGamesForTeam)).toBe('Function');
});

it('fetchGamesForTeam returns a thunk', () => {
  expect(R.type(fetchGamesForTeam('knicks'))).toBe('Function');
});
