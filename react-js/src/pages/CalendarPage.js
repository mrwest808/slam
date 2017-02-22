import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CalendarMonth, Container, GameCell } from '../components';
import {
  selectGameListForTeam,
  selectGamesForTeam,
} from '../store/modules/games';
import { selectTeamById } from '../store/modules/teams';

// TODO
// Skip the router and always land on team select, so we don't have to fetch
// team information here...

class CalendarPage extends Component {
  static propTypes = {
    gameList: PropTypes.object,
    games: PropTypes.object,
    team: PropTypes.object,
  };

  componentDidMount() {
    const { teamId } = this.props.match.params;

    if (!this.props.team) {
      this.props.fetchTeamById(teamId);
    }

    if (!this.props.gameList) {
      this.props.fetchGamesForTeam(teamId);
    }
  }

  renderDay = (day, month) => {
    console.log('-> renderDay', { day, month });

    return <GameCell day={day} month={month} />;
  };

  render() {
    console.log('-> this.props', this.props);

    return (
      <Container>
        <CalendarMonth
          onDaySelect={console.log.bind(console)}
          renderDay={this.renderDay}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const gameList = selectGameListForTeam(state, props.match.params);
  const games = selectGamesForTeam(state, props.match.params);
  const team = selectTeamById(state, props.match.params);

  return { gameList, games, team };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
