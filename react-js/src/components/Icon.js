import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Icon = ({ className, name }) => (
  <i className={classnames(['material-icons', className])}>
    {name}
  </i>
)

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default Icon
