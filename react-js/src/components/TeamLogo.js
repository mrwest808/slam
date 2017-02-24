import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TeamLogo = ({ className, size, team }) => (
  <img
    alt={`${team.fullName} logo`}
    className={classnames([ 'team-logo', `team-logo--${size}`, className ])}
    src={`logos/${team.abbreviation}.svg`}
  />
);

TeamLogo.propTypes = {
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]).isRequired,
  team: PropTypes.shape({
    abbreviation: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
  }),
};

TeamLogo.defaultProps = { size: 'medium' };

export default TeamLogo;
