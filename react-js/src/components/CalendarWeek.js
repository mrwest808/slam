import React, { Component, PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import CalendarHeader from './calendar/CalendarHeader';
import WeekRow from './calendar/WeekRow';

export default class CalendarWeek extends Component {
  static propTypes = {
    onDaySelect: PropTypes.func.isRequired,
    renderDay: PropTypes.func.isRequired,
    selectedDate: MomentPropTypes.momentObj,
  };

  static defaultProps = {
    renderDay(day) {
      return (
        <div>
          {day.format('MMM')}
          <br />
          {day.format('Do')}
        </div>
      );
    },
  };

  constructor(props) {
    super(props);

    this.state = this.createState(props.selectedDate || moment());
  }

  createState(date) {
    const week = date.clone().startOf('isoWeek');
    const days = [];

    let day = moment(week);
    while (day.isSame(week, 'isoWeek')) {
      days.push(day.clone());
      day.add(1, 'day');
    }

    return {
      currentWeek: week.format('w'),
      currentYear: week.format('YYYY'),
      days,
      week,
    };
  }

  handlePrevClick = () => {
    const prevWeek = this.state.week.clone().subtract(1, 'week');

    this.setState(this.createState(prevWeek));
  };

  handleNextClick = () => {
    const nextWeek = this.state.week.clone().add(1, 'week');

    this.setState(this.createState(nextWeek));
  };

  renderDay = day => {
    return this.props.renderDay(day, this.state.week);
  };

  render() {
    const { currentWeek, currentYear, days } = this.state;

    return (
      <div className="calendar">
        <CalendarHeader
          onPrevClick={this.handlePrevClick}
          onNextClick={this.handleNextClick}
        >
          Week {currentWeek}, {currentYear}
        </CalendarHeader>
        <div>
          <WeekRow
            days={days}
            onDaySelect={this.props.onDaySelect}
            renderDay={this.renderDay}
          />
        </div>
      </div>
    );
  }
}
