import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Icon from './Icon'

const IconButton = ({ className, name, onClick }) => (
  <button
    className={classnames(['icon-button', className])}
    onClick={onClick}
  >
    <Icon name={name} />
  </button>
)

IconButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IconButton
