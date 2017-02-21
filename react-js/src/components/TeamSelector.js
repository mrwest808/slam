import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const mapValues = R.useWith(R.map, [ R.identity, R.values ]);

class TeamSelector extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    teams: PropTypes.object.isRequired,
  };

  renderTeam = team => (
    <a
      key={team.teamId}
      className="team-selector__team"
      href="#"
      onClick={event => {
        event.preventDefault();
        this.props.onSelect(team);
      }}
    >
      <img
        className="team-selector__team__image"
        src={`logos/${team.abbreviation}.svg`}
        alt={`${team.fullName} logo`}
      />
      <h5 className="team-selector__team__name">
        {team.fullName}
      </h5>
    </a>
  );

  render() {
    const { className, teams } = this.props;

    return (
      <div className={classnames([ 'team-selector', className ])}>
        {mapValues(this.renderTeam, teams)}
      </div>
    );
  }
}

export default TeamSelector;
