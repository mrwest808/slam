import R from 'ramda';
import { createSelector } from 'reselect';
import teamsReducer, { FETCH_TEAMS_SUCCESS, selectTeamById } from '../teams';

const action = {
  type: FETCH_TEAMS_SUCCESS,
  payload: { teams: { knicks: {}, cavs: {} } },
};
const teamsState = teamsReducer(undefined, action);
const state = { teams: teamsState };

it('selectTeamById returns expected', () => {
  const knicks = selectTeamById(state, { teamId: 'knicks' })
  const cavs = selectTeamById(state, { teamId: 'cavs' })
  const lakers = selectTeamById(state, { teamId: 'lakers' })

  expect(knicks).toEqual(action.payload.teams.knicks)
  expect(cavs).toEqual(action.payload.teams.cavs)
  expect(lakers).toBe(undefined)
})

it('selectors are memoized', () => {
  let i = 0
  const select = createSelector(selectTeamById, team => {
    i++
    return team
  })

  select(state, { teamId: 'knicks' })
  select(state, { teamId: 'knicks' })

  expect(i).toBe(1)
});
