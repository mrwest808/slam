import React, { Component, PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import chunk from 'lodash.chunk';
import WeekRow from './CalendarWeekRow';

export default class CalendarMonth extends Component {
  static propTypes = {
    month: MomentPropTypes.momentObj.isRequired,
    renderDay: PropTypes.func,
  };

  state = this.createState();

  componentDidUpdate(prevProps) {
    if (!prevProps.month.isSame(this.props.month, 'month')) {
      this.setState(this.createState());
    }
  }

  createState() {
    const { month } = this.props;

    const firstMonday = month.clone().startOf('isoWeek');
    const lastSunday = month.clone().add(5, 'weeks').endOf('isoWeek');
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
    };
  }

  renderWeek = (days, index) => {
    return (
      <WeekRow
        key={index}
        days={days}
        month={this.props.month}
        renderDay={this.props.renderDay}
      />
    );
  };

  render() {
    const { weeks } = this.state;

    return (
      <div className="month">
        {weeks.map(this.renderWeek)}
      </div>
    );
  }
}
