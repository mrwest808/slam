import React, { Component, PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import classnames from 'classnames';

// TODO Move prop types into class
class GameCell extends Component {
  static propTypes = {
    day: MomentPropTypes.momentObj.isRequired,
    isGameNight: PropTypes.bool.isRequired,
    isHomeGame: PropTypes.bool.isRequired,
    opponent: PropTypes.string,
    outcome: PropTypes.oneOf([ 'win', 'loss' ]),
    score: PropTypes.string,
    showScores: PropTypes.bool.isRequired,
    time: PropTypes.string,
  };

  static defaultProps = {
    isGameNight: false,
    isHomeGame: false,
    showScores: false,
  };

  renderGame() {
    const {
      isHomeGame,
      opponent,
      outcome,
      score,
      showScores,
      time,
    } = this.props;
    const isUpcoming = !outcome;

    return (
      <div className="game-cell__matchup">
        <p className={isHomeGame && 'bold'}>
          {isHomeGame ? 'vs' : '@'} {opponent}
          {
            !isUpcoming &&
            showScores &&
              <span className="sm-hide md-hide lg-hide"> ({score})</span>
          }
        </p>
        {isUpcoming && <p className="h6 xs-hide">{time}</p>}
        {!isUpcoming && showScores && <p className="h6 xs-hide">{score}</p>}
      </div>
    );
  }

  render() {
    const { day, isGameNight, outcome, showScores, time } = this.props;
    const dayInMonth = day.format('D');
    const dayLabel = Number(dayInMonth) === 1
      ? {
        long: `${day.format('ddd')}, ${day.format('MMM')} ${dayInMonth}`,
        short: `${day.format('MMM')} ${dayInMonth}`,
      }
      : {
        long: `${day.format('ddd')}, ${day.format('MMM')} ${dayInMonth}`,
        short: dayInMonth,
      };

    return (
      <div
        className={
          classnames([
            'game-cell',
            isGameNight && 'game-cell--is-game-night',
            showScores && 'game-cell--show-scores',
            outcome === 'win' && 'game-cell--is-win',
            outcome === 'loss' && 'game-cell--is-loss',
          ])
        }
      >
        <span className="game-cell__date">
          <span className="sm-hide md-hide lg-hide">
            {dayLabel.long}
            {isGameNight && ` at ${time}`}
          </span>
          <span className="xs-hide">{dayLabel.short}</span>
        </span>
        {isGameNight && this.renderGame()}
      </div>
    );
  }
}

export default GameCell;
