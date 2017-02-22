import teamsReducer, {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
  SELECT_TEAM,
  RESET_TEAM,
} from '../teams';

const initialState = teamsReducer(undefined, { type: 'INIT' });

it('returns expected initial state', () => {
  const { allTeams, selectedTeam } = initialState;

  expect(allTeams).toBeValidTeamList();
  expect(allTeams.teams).toBeEmpty();

  expect(selectedTeam).toBe(null);
});

it('handles FETCH_TEAMS_REQUEST action', () => {
  const action = { type: FETCH_TEAMS_REQUEST, payload: {} };
  const state = teamsReducer(initialState, action);
  const { allTeams } = state;

  expect(allTeams).toBeValidTeamList();
  expect(allTeams.isFetching).toBe(true);
  expect(allTeams.teams).toBeEmpty();
});

it('handles FETCH_GAMES_FOR_TEAM_SUCCESS action', () => {
  const action = {
    type: FETCH_TEAMS_SUCCESS,
    payload: { teams: { knicks: {}, cavs: {} } },
  };
  const state = teamsReducer(initialState, action);
  const { allTeams } = state;

  expect(allTeams).toBeValidTeamList();
  expect(allTeams.isFetching).toBe(false);
  expect(allTeams.hasFetched).toBe(true);
  expect(allTeams.teams).toEqual(action.payload.teams);
});

it('handles FETCH_TEAMS_FAILURE action', () => {
  const action = {
    type: FETCH_TEAMS_FAILURE,
    payload: { error: new Error('Something went wrong') },
  };
  const state = teamsReducer(initialState, action);
  const { allTeams } = state;

  expect(allTeams).toBeValidTeamList();
  expect(allTeams.error).toBe(action.payload.error);
  expect(allTeams.teams).toBeEmpty();
});

it('handles SELECT_TEAM action', () => {
  const action = { type: SELECT_TEAM, payload: 'cavs' };
  const state = teamsReducer(initialState, action);
  const { selectedTeam } = state;

  expect(selectedTeam).toBe(action.payload);
});

it('handles RESET_TEAM action', () => {
  const selectAction = { type: SELECT_TEAM, payload: 'cavs' };
  const resetAction = { type: RESET_TEAM };

  const stateOne = teamsReducer(initialState, selectAction);
  const stateTwo = teamsReducer(stateOne, resetAction);

  expect(stateOne.selectedTeam).toBe(selectAction.payload);
  expect(stateTwo.selectedTeam).toBeNull();
});
