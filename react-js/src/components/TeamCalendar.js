import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Button from './Button';
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

    this.state = {
      gamesByDate: gamesByDate(props.games),
      showScores: false,
    };
  }

  toggleScores = () => this.setState({ showScores: !this.state.showScores });

  renderDay = (day, month) => {
    const isoDate = toISODateString(day);
    const game = this.state.gamesByDate[isoDate];
    const time = game && moment(game.eventStartDateTime).format('LT');
    const outcome = game && game.teamEventResult;
    const score = game &&
      `${game.teamPointsScored} - ${game.opponentPointsScored}`;

    return (
      <GameCell
        day={day}
        month={month}
        isGameNight={!!game}
        isHomeGame={game && game.teamEventLocationType === 'h'}
        opponent={game && game.opponent.abbreviation}
        outcome={outcome}
        score={score}
        showScores={this.state.showScores}
        time={time}
      />
    );
  };

  render() {
    const { className, onReset, team } = this.props;
    const { showScores } = this.state;

    return (
      <div className={className}>
        <Team hideName team={team} />
        <Button className="block mx-auto mb2" onClick={onReset}>
          Reset team
        </Button>
        <Button className="block mx-auto mb3" onClick={this.toggleScores}>
          {showScores ? 'Hide' : 'Show'} scores
        </Button>
        <CalendarMonth onDaySelect={noop} renderDay={this.renderDay} />
      </div>
    );
  }
}
