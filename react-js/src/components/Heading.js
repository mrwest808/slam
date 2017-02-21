import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Heading = ({ align, children, className, size, uppercase, ...other }) => {
  const type = `h${size}`;
  const classNames = classnames([
    type,
    className,
    align && `text-${align}`,
    uppercase && 'text-uppercase',
  ]);

  return React.createElement(
    type,
    { className: classNames, ...other },
    children,
  );
};

Heading.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  uppercase: PropTypes.bool.isRequired,
}

Heading.defaultProps = {
  size: 1,
  uppercase: false,
}

export default Heading
