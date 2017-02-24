import React, { PropTypes } from 'react'
import MomentPropTypes from 'react-moment-proptypes';
import DayCell from './DayCell'

const WeekRow = ({ days, month, onDaySelect, renderDay }) => (
  <div className="week-row">
    {days.map((day, index) =>
      <DayCell
        key={index}
        day={day}
        isCurrentMonth={day.isSame(month, 'month')}
        renderDay={renderDay}
      />
    )}
  </div>
)

WeekRow.propTypes = {
  days: PropTypes.arrayOf(MomentPropTypes.momentObj).isRequired,
  month: MomentPropTypes.momentObj.isRequired,
  renderDay: PropTypes.func,
}

export default WeekRow
