import React, { Component, PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import classnames from 'classnames';
import moment from 'moment';

class GameCell extends Component {
  render() {
    const {
      day,
      month,
      isGameNight,
      isHomeGame,
      opponent,
      outcome,
      score,
      showScores,
      time,
    } = this.props;
    const withinCurrentMonth = day.isSame(month, 'month');
    const isToday = day.isSame(moment(), 'day');
    const isUpcoming = !outcome;

    return (
      <div
        className={
          classnames([
            'game-cell',
            isToday && 'game-cell--is-today',
            isGameNight && 'game-cell--game-night',
            showScores && 'game-cell--show-scores',
            outcome === 'win' && 'game-cell--is-win',
            outcome === 'loss' && 'game-cell--is-loss',
            !withinCurrentMonth && 'muted',
          ])
        }
      >
        <div className="game-cell__header">
          <span className="game-cell__header__date xs-hide">
            {day.format('D')}
          </span>
          <span className="game-cell__header__date sm-hide md-hide lg-hide">
            {day.format('dddd')}, {day.format('MMM')} {day.format('D')} {time ? `at ${time}` : ''}
          </span>
          <span>
            {isGameNight ? '\uD83C\uDFC0' : ''}
          </span>
        </div>
        {opponent && (
          <div
            className={
              classnames([
                'game-cell__matchup',
                isHomeGame && 'game-cell__matchup--home',
              ])
            }
          >
            <span>
              {isHomeGame ? 'vs.' : '@'} {opponent}
            </span>
            {!isUpcoming && showScores &&
              <span className="sm-hide md-hide lg-hide">
                {' '}({score})
              </span>
            }
            <span className="block xs-hide h6 regular">
              {isUpcoming && time}
              {!isUpcoming && showScores && `(${score})`}
            </span>
          </div>
        )}
      </div>
    );
  }
}

GameCell.propTypes = {
  day: MomentPropTypes.momentObj.isRequired,
  isGameNight: PropTypes.bool.isRequired,
  isHomeGame: PropTypes.bool.isRequired,
  month: MomentPropTypes.momentObj.isRequired,
  opponent: PropTypes.string,
  outcome: PropTypes.oneOf([ 'win', 'loss' ]),
  score: PropTypes.string,
  showScores: PropTypes.bool.isRequired,
  time: PropTypes.string,
};

GameCell.defaultProps = {
  isGameNight: false,
  isHomeGame: false,
  showScores: false,
};

export default GameCell;
