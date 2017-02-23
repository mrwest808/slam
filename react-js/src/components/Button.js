import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Button = ({ children, className, onClick }) => (
  <button
    className={classnames([
      'button',
      className,
    ])}
    onClick={onClick}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button
