import R from 'ramda';
import React, { PropTypes } from 'react';
import moment from 'moment'

const daysInWeek = R.range(1, 8);
const isoDayNames = daysInWeek.map(num => {
  const day = moment().isoWeekday(num)

  return {
    long: day.format('dddd'),
    short: day.format('ddd'),
  }
})

const DayHeadings = ({ shortNames }) => (
  <div className="calendar__headings">
    {isoDayNames.map((day, index) => (
      <div key={index} className="calendar__headings__cell">
        {shortNames ? day.short : day.long}
      </div>
    ))}
  </div>
);

DayHeadings.propTypes = { shortNames: PropTypes.bool.isRequired };
DayHeadings.defaultProps = { shortNames: false };

export default DayHeadings;
