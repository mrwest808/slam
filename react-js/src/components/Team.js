import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Team = ({ className, hideName, team }) => (
  <div className={classnames(['team', className])}>
    <img
      className="team__image"
      src={`logos/${team.abbreviation}.svg`}
      alt={`${team.fullName} logo`}
    />
    { !hideName &&
      <h5 className="team__name">
        {team.fullName}
      </h5>
    }
  </div>
)

Team.propTypes = {
  hideName: PropTypes.bool.isRequired,
  team: PropTypes.shape({
    abbreviation: PropTypes.string,
    fullName: PropTypes.string,
  }).isRequired,
}

Team.defaultProps = {
  hideName: false,
}

export default Team
