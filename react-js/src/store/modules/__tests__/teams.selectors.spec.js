import teamsReducer, {
  FETCH_TEAMS_SUCCESS,
  SELECT_TEAM,
  selectTeamById,
  selectSelectedTeam,
} from '../teams';

describe('selectTeamById', () => {
  const action = {
    type: FETCH_TEAMS_SUCCESS,
    payload: { teams: { knicks: {}, cavs: {} } },
  };
  const teamsState = teamsReducer(undefined, action);
  const state = { teams: teamsState };

  it('returns expected data', () => {
    const knicks = selectTeamById(state, { teamId: 'knicks' });
    const cavs = selectTeamById(state, { teamId: 'cavs' });
    const lakers = selectTeamById(state, { teamId: 'lakers' });

    expect(knicks).toEqual(action.payload.teams.knicks);
    expect(cavs).toEqual(action.payload.teams.cavs);
    expect(lakers).toBe(undefined);
  });

  it('is memoized', () => {
    const props = { teamId: 'knicks' };
    expect(selectTeamById).toBeMemoized(state, props);
  });
});

describe('selectSelectedTeam', () => {
  const action = { type: SELECT_TEAM, payload: 'cavs' };
  const teamsState = teamsReducer(undefined, action);
  const state = { teams: teamsState };

  it('returns expected data', () => {
    const selectedState = selectSelectedTeam(state);

    expect(selectedState).toBe(action.payload);
  });
});
