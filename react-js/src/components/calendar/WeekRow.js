import React, { PropTypes } from 'react'
import MomentPropTypes from 'react-moment-proptypes';
import DayCell from './DayCell'

const WeekRow = ({ days, onDaySelect, renderDay }) => (
  <div className="calendar__row">
    {days.map((day, index) =>
      <DayCell
        key={index}
        day={day}
        onClick={onDaySelect}
        renderDay={renderDay}
      />
    )}
  </div>
)

WeekRow.propTypes = {
  days: PropTypes.arrayOf(MomentPropTypes.momentObj).isRequired,
  onDaySelect: PropTypes.func.isRequired,
  renderDay: PropTypes.func.isRequired,
}

export default WeekRow
