import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import MomentPropTypes from 'react-moment-proptypes';

const today = moment();

export default class CalendarDayCell extends Component {
  static propTypes = {
    day: MomentPropTypes.momentObj.isRequired,
    isCurrentMonth: PropTypes.bool.isRequired,
    renderDay: PropTypes.func.isRequired,
  };

  static defaultProps = {
    renderDay: day => {
      const dayInMonth = day.format('D');
      const dayLabel = Number(dayInMonth) === 1
        ? `${day.format('MMM')} ${dayInMonth}`
        : dayInMonth;

      return (
        <div className="default-day-cell">
          <span className="default-day-cell__date">{dayLabel}</span>
        </div>
      );
    },
  };

  renderCell() {
    return this.props.renderDay(this.props.day);
  }

  render() {
    const { day, isCurrentMonth } = this.props;
    const isWeekend = day.isoWeekday() > 5;
    const isToday = day.isSame(today, 'day');
    const isFirstDayOfMonth = day.date() === 1;

    return (
      <div
        className={
          classnames([
            'day-cell',
            isWeekend && 'day-cell--is-weekend',
            isToday && 'day-cell--is-today',
            isCurrentMonth && 'day-cell--is-current-month',
            isFirstDayOfMonth && 'day-cell--is-first-day-of-month',
          ])
        }
      >
        {this.renderCell()}
      </div>
    );
  }
}
