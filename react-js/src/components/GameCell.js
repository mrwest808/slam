import React, { PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import classnames from 'classnames';
import moment from 'moment';

const GameCell = ({ day, isGameNight, isHomeGame, month, opponent, time }) => {
  const withinCurrentMonth = day.isSame(month, 'month');
  const isToday = day.isSame(moment(), 'day');

  return (
    <div
      className={
        classnames([
          'game-cell',
          isToday && 'game-cell--is-today',
          isGameNight && 'game-cell--game-night',
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
          <span className="block xs-hide h6 regular">
            {time}
          </span>
        </div>
      )}
    </div>
  );
};

GameCell.propTypes = {
  day: MomentPropTypes.momentObj.isRequired,
  isGameNight: PropTypes.bool.isRequired,
  isHomeGame: PropTypes.bool.isRequired,
  month: MomentPropTypes.momentObj.isRequired,
  opponent: PropTypes.string,
  time: PropTypes.string,
};

GameCell.defaultProps = { isGameNight: false, isHomeGame: false };

export default GameCell;
