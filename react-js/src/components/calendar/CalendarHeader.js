import React, { PropTypes } from 'react'

const CalendarHeader = ({ children, onPrevClick, onNextClick }) => (
  <div className="calendar__header">
    <button className="calendar__header__prev" onClick={onPrevClick}>
      Prev
    </button>
    <span className="calendar__header__label">{children}</span>
    <button className="calendar__header__next" onClick={onNextClick}>
      Next
    </button>
  </div>
)

CalendarHeader.propTypes = {
  children: PropTypes.any,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

export default CalendarHeader
