import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import CalendarMonth from './CalendarMonth';
import GameCell from './GameCell';
import Team from './Team';

const noop = () => {};
const trimISOString = R.compose(R.head, R.split('T'));
const toISODateString = date => {
  if (!moment.isMoment(date) && !moment.isDate(date)) {
    date = new Date(date);
  }

  return trimISOString(date.toISOString());
};

const gamesByDate = R.compose(
  R.reduce(
    (acc, game) => {
      const isoDate = toISODateString(game.eventStartDateTime);
      return R.merge(acc, { [isoDate]: game });
    },
    {},
  ),
  R.values,
);

export default class TeamCalendar extends Component {
  static propTypes = {
    className: PropTypes.string,
    onReset: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { gamesByDate: gamesByDate(props.games) };
  }

  renderDay = (day, month) => {
    const isoDate = toISODateString(day);
    const game = this.state.gamesByDate[isoDate];
    const time = game && moment(game.eventStartDateTime).format('LT')

    return (
      <GameCell
        day={day}
        month={month}
        isGameNight={!!game}
        isHomeGame={game && game.teamEventLocationType === 'h'}
        opponent={game && game.opponent.abbreviation}
        time={time}
      />
    );
  };

  render() {
    const { className, onReset, team } = this.props;

    return (
      <div className={className}>
        <Team hideName team={team} />
        <a
          className="block mb3 py1 text-center link"
          href="#"
          onClick={event => {
            event.preventDefault();
            onReset();
          }}
        >
          Reset team
        </a>
        <CalendarMonth onDaySelect={noop} renderDay={this.renderDay} />
      </div>
    );
  }
}
