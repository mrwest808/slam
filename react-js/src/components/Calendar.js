import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import Button from './Button';
import CalendarMonth from './CalendarMonth';
import IconButton from './IconButton';
import DayHeadings from './calendar/DayHeadings';
import GameCell from './GameCell';
import { toISODateString } from '../utils';

export default class Calendar extends Component {
  static propTypes = {
    gameList: PropTypes.object,
    team: PropTypes.shape({
      teamId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
    }),
    toggleSidebar: PropTypes.func.isRequired,
  };

  state = { month: moment().utc().startOf('month'), showScores: false };

  handlePrevClick = () => {
    const prevMonth = this.state.month.clone().subtract(1, 'month');
    this.setState({ month: prevMonth });
  };

  handleNextClick = () => {
    const nextMonth = this.state.month.clone().add(1, 'month');
    this.setState({ month: nextMonth });
  };

  handleTodayClick = () => {
    const today = moment().utc();

    if (!today.isSame(this.state.month, 'month')) {
      this.setState({ month: today.startOf('month') });
    }
  };

  toggleScores = () => this.setState({ showScores: !this.state.showScores });

  renderDay = day => {
    const { gameList } = this.props;

    const isoDate = toISODateString(day);
    const game = gameList && gameList.gamesByDate[isoDate];
    const time = game && moment(game.eventStartDateTime).format('LT');
    const outcome = game && game.teamEventResult;
    const score = game &&
      `${game.teamPointsScored} - ${game.opponentPointsScored}`;

    return (
      <GameCell
        day={day}
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
    const { gameList, team } = this.props;
    const { month, showScores } = this.state;
    const isFetching = gameList && gameList.isFetching;

    return (
      <div className="fill-y calendar">
        <div className="calendar__header">
          <div className="calendar__header-inner">
            <h2 className="calendar__header__title">
              <span className="xs-hide">{month.format('MMMM')}</span>
              <span className="sm-hide md-hide lg-hide">
                {month.format('MMM')}
              </span>
              {' '}
              <span className="light">{month.format('YYYY')}</span>
              {team && (
                <span
                  className={classnames([ 'light', isFetching && 'muted' ])}
                >
                  {' '}- {team.firstName}{isFetching && '...'}
                </span>
              )}
            </h2>
            <div className="calendar__header__actions">
              <IconButton name="chevron_left" onClick={this.handlePrevClick} />
              <Button onClick={this.handleTodayClick}>
                Today
              </Button>
              <IconButton name="chevron_right" onClick={this.handleNextClick} />
              {team && (
                <Button
                  className="score-toggle"
                  onClick={this.toggleScores}
                >
                  {showScores ? 'Hide' : 'Show'} scores
                </Button>
              )}
              <IconButton
                className="menu-button md-hide lg-hide"
                name="more_horiz"
                onClick={this.props.toggleSidebar}
              />
            </div>
          </div>
          <div className="calendar__header__weekdays">
            <DayHeadings shortNames />
          </div>
        </div>
        <div className="calendar__body">
          <CalendarMonth month={month} renderDay={this.renderDay} />
        </div>
      </div>
    );
  }
}
