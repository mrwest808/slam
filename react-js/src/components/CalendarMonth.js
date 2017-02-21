import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import chunk from 'lodash.chunk';
import CalendarHeader from './calendar/CalendarHeader';
import DayHeadings from './calendar/DayHeadings';
import WeekRow from './calendar/WeekRow';

export default class CalendarMonth extends Component {
  static propTypes = {
    onDaySelect: PropTypes.func.isRequired,
    renderDay: PropTypes.func.isRequired,
    selectedDate: MomentPropTypes.momentObj,
  };

  static defaultProps = {
    renderDay(day, month) {
      return (
        <div className={classnames([ !day.isSame(month, 'month') && 'muted' ])}>
          {day.format('D')}
        </div>
      );
    },
  };

  constructor(props) {
    super(props);

    this.state = this.createState(props.selectedDate || moment());
  }

  createState(date) {
    const month = date.clone().startOf('month');
    const firstMonday = month.clone().startOf('isoWeek');
    const lastSunday = month.clone().endOf('month').endOf('isoWeek');
    const days = [];

    let day = moment(firstMonday);
    while (day.isSameOrBefore(lastSunday)) {
      days.push(day.clone());
      day.add(1, 'day');
    }

    return {
      currentMonth: month.format('MMMM'),
      currentYear: month.format('YYYY'),
      weeks: chunk(days, 7),
      month,
    };
  }

  handlePrevClick = () => {
    const prevMonth = this.state.month.clone().subtract(1, 'month');

    this.setState(this.createState(prevMonth));
  };

  handleNextClick = () => {
    const nextMonth = this.state.month.clone().add(1, 'month');

    this.setState(this.createState(nextMonth));
  };

  renderDay = day => {
    return this.props.renderDay(day, this.state.month);
  };

  renderWeek = (days, index) => {
    return (
      <WeekRow
        key={index}
        days={days}
        onDaySelect={this.props.onDaySelect}
        renderDay={this.renderDay}
      />
    );
  };

  render() {
    const { currentMonth, currentYear, weeks } = this.state;

    return (
      <div className="calendar">
        <CalendarHeader
          onPrevClick={this.handlePrevClick}
          onNextClick={this.handleNextClick}
        >
          {currentMonth} {currentYear}
        </CalendarHeader>
        <DayHeadings shortNames />
        <div>
          {weeks.map(this.renderWeek)}
        </div>
      </div>
    );
  }
}
