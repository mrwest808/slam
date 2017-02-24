import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Loader = ({ className }) => (
  <div className={classnames([ 'loader', className ])}>
    Loading...
  </div>
);

Loader.propTypes = { className: PropTypes.string };

export default Loader;
