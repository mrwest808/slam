import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Container, Heading, TeamCalendar, TeamSelector } from './components';
import {
  fetchGamesForTeam,
  selectGameListForTeam,
} from './store/modules/games';
import {
  fetchTeams,
  resetTeam,
  selectTeam,
  selectAllTeams,
  selectSelectedTeam,
} from './store/modules/teams';

class App extends Component {
  componentWillMount() {
    this.props.fetchTeams();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.selectedTeam
      && this.props.selectedTeam
      && !this.props.gameList
    ) {
      this.props.fetchGamesForTeam(this.props.selectedTeam);
    }
  }

  onSelectTeam = team => {
    this.props.selectTeam(team.teamId);
  };

  renderTeamSelect() {
    const { teamList } = this.props;

    return (
      <div>
        <Heading align="center" className="mb3" uppercase>
          Select your team
        </Heading>
        <TeamSelector onSelect={this.onSelectTeam} teams={teamList.teams} />
      </div>
    );
  }

  renderTeamCalendar() {
    const { gameList, selectedTeam, teamList } = this.props;
    const team = teamList.teams[selectedTeam];
    const games = gameList && gameList.games;

    return (
      <Loader loaded={gameList && gameList.hasFetched}>
        <TeamCalendar
          games={games}
          onReset={this.props.resetTeam}
          team={team}
        />
      </Loader>
    );
  }

  render() {
    const { selectedTeam, teamList } = this.props;

    return (
      <Container>
        <Loader loaded={teamList.hasFetched}>
          {selectedTeam ? this.renderTeamCalendar() : this.renderTeamSelect()}
        </Loader>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const selectedTeam = selectSelectedTeam(state);

  return {
    selectedTeam,
    gameList: selectGameListForTeam(state, { teamId: selectedTeam }),
    teamList: selectAllTeams(state),
  };
};

const mapDispatchToProps = {
  fetchGamesForTeam,
  fetchTeams,
  resetTeam,
  selectTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
