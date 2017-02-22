import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Team from './Team'

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
      <Team team={team} />
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
