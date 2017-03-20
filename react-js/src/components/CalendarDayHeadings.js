import R from 'ramda';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

const daysInWeek = R.range(1, 8);
const isoDayNames = daysInWeek.map(num => {
  const day = moment().isoWeekday(num);

  return {
    isWeekend: day.isoWeekday() > 5,
    long: day.format('dddd'),
    short: day.format('ddd'),
  };
});

const CalendarDayHeadings = ({ shortNames }) => (
  <div className="weekdays">
    {isoDayNames.map((day, index) => (
      <div
        key={index}
        className={
          classnames([
              'weekdays__cell',
              day.isWeekend && 'weekdays__cell--is-weekend',
          ])
        }
      >
        {shortNames ? day.short : day.long}
      </div>
    ))}
  </div>
);

CalendarDayHeadings.propTypes = { shortNames: PropTypes.bool.isRequired };
CalendarDayHeadings.defaultProps = { shortNames: false };

export default CalendarDayHeadings;
