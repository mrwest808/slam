import React, { PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import classnames from 'classnames';

const GameCell = ({ day, isGameNight, month }) => {
  const withinCurrentMonth = day.isSame(month, 'month');

  return (
    <div
      className={
        classnames([
          'game-cell',
          isGameNight && 'game-cell--game-night',
          !withinCurrentMonth && 'muted',
        ])
      }
    >
      <div className="game-cell__header">
        <span>
          {day.format('D')}
        </span>
        <span>
          {isGameNight ? '🏀' : ''}
        </span>
      </div>
    </div>
  );
};

GameCell.propTypes = {
  day: MomentPropTypes.momentObj.isRequired,
  isGameNight: PropTypes.bool.isRequired,
  month: MomentPropTypes.momentObj.isRequired,
};

GameCell.defaultProps = { isGameNight: false };

export default GameCell;
