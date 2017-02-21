import React from 'react';
import { connect } from 'react-redux';
import { CalendarMonth, Container, GameCell } from '../components';
import { selectGamesForTeam } from '../store/modules/games'
import { selectTeamById } from '../store/modules/teams'

const renderDay = (day, month) => <GameCell day={day} month={month} />;
const log = console.log.bind(console);

// TODO Trigger fetch actions if necessary
// TODO Finish up UI
const CalendarPage = props => {
  return (
    <Container>
      <CalendarMonth onDaySelect={log} renderDay={renderDay} />
    </Container>
  )
};

const mapStateToProps = (state, props) => ({
  games: selectGamesForTeam(state, props.match.params),
  team: selectTeamById(state, props.match.params),
})

export default connect(mapStateToProps)(CalendarPage);
