import React, { Component, PropTypes } from 'react';
import MomentPropTypes from 'react-moment-proptypes';

export default class DayCell extends Component {
  static propTypes = {
    day: MomentPropTypes.momentObj.isRequired,
    onClick: PropTypes.func.isRequired,
    renderDay: PropTypes.func.isRequired,
  };

  handleClick = event => {
    event.preventDefault();
    this.props.onClick(this.props.day);
  };

  renderCell() {
    return this.props.renderDay(this.props.day);
  }

  render() {
    return (
      <a className="calendar__row__cell" href="#" onClick={this.handleClick}>
        {this.renderCell()}
      </a>
    );
  }
}
