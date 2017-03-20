import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Loader from './Loader';
import TeamLogo from './TeamLogo';

const mapValues = R.useWith(R.map, [ R.identity, R.values ]);

export default class Sidebar extends Component {
  static propTypes = {
    onSelectTeam: PropTypes.func.isRequired,
    selectedTeam: PropTypes.string,
    showMobileSidebar: PropTypes.bool.isRequired,
    teamList: PropTypes.shape({
      hasFetched: PropTypes.bool,
      teams: PropTypes.object,
    }).isRequired,
  };

  renderTeam = team => {
    return (
      <a
        key={team.teamId}
        className={classnames([
          'sidebar__team',
          this.props.selectedTeam === team.teamId && 'sidebar__team--is-selected',
        ])}
        href="#"
        onClick={event => {
          event.preventDefault();
          this.props.onSelectTeam(team);
        }}
      >
        <TeamLogo team={team} />
        <span>{team.fullName}</span>
      </a>
    );
  };

  render() {
    const { showMobileSidebar, teamList } = this.props;

    return (
      <div
        className={classnames([
          'sidebar',
          showMobileSidebar && 'sidebar--visible',
        ])}
      >
        {!teamList.hasFetched && <Loader />}
        {teamList.hasFetched && mapValues(this.renderTeam, teamList.teams)}
      </div>
    );
  }
}
