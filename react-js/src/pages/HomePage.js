import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Container, Heading, TeamSelector } from '../components';
import { fetchTeams, selectAllTeams } from '../store/modules/teams';

class HomePage extends Component {
  static propTypes = {
    teamList: PropTypes.shape({
      isFetching: PropTypes.bool,
      hasFetched: PropTypes.bool,
      teams: PropTypes.object,
    }).isRequired,
  };

  componentDidMount() {
    this.props.fetchTeams();
  }

  onSelectTeam = team => {
    this.props.push(`/team/${team.teamId}`)
  }

  render() {
    const { teamList } = this.props;

    return (
      <Container>
        <Heading align="center" className="mb3" uppercase>
          Select your team
        </Heading>
        <Loader color="#888" loaded={teamList.hasFetched}>
          <TeamSelector
            onSelect={this.onSelectTeam}
            teams={teamList.teams}
          />
        </Loader>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ teamList: selectAllTeams(state) });
const mapDispatchToProps = { fetchTeams };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
