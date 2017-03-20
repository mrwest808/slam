import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, Sidebar } from './components';
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
  state = { showMobileSidebar: false };

  componentWillMount() {
    this.props.fetchTeams();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedTeam !== this.props.selectedTeam && !this.props.gameList) {
      this.props.fetchGamesForTeam(this.props.selectedTeam);
    }
  }

  toggleShowMobileSidebar = () => {
    this.setState({ showMobileSidebar: !this.state.showMobileSidebar });
  };

  onSelectTeam = team => {
    this.props.selectTeam(team.teamId);

    if (this.state.showMobileSidebar) {
      this.toggleShowMobileSidebar();
    }
  };

  render() {
    const { gameList, selectedTeam, teamList } = this.props;
    const { showMobileSidebar } = this.state;

    return (
      <div className="app-container">
        <Sidebar
          onSelectTeam={this.onSelectTeam}
          selectedTeam={selectedTeam}
          showMobileSidebar={showMobileSidebar}
          teamList={teamList}
        />
        <Calendar
          gameList={gameList}
          team={selectedTeam && teamList.teams[selectedTeam]}
          toggleSidebar={this.toggleShowMobileSidebar}
        />
      </div>
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
