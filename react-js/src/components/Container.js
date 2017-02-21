import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Container = ({ children, className }) => (
  <div className={classnames([ 'container', className ])}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Container;
