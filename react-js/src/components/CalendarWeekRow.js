import React, { PropTypes } from 'react'
import MomentPropTypes from 'react-moment-proptypes';
import DayCell from './CalendarDayCell'

const CalendarWeekRow = ({ days, month, onDaySelect, renderDay }) => (
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

CalendarWeekRow.propTypes = {
  days: PropTypes.arrayOf(MomentPropTypes.momentObj).isRequired,
  month: MomentPropTypes.momentObj.isRequired,
  renderDay: PropTypes.func,
}

export default CalendarWeekRow
