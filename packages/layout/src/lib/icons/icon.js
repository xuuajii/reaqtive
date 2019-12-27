//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => {

  const { size, type, unit, viewBoxSize } = props;
  if (type.endsWith('svg')) {
    return (
      <img className="svg-icon" style={{...props.style}} width={`${size}${unit}`} height={`${size}${unit}`} src={type} alt="" />
    );
  } else {
    const path = props.type;

    return (
      <svg className="svg-icon" style={{...props.style}} width={`${size}${unit}`} height={`${size}${unit}`} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <path fill="currentColor" d={path} />
      </svg>
    );
  }
}

Icon.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string.isRequired,
  unit: PropTypes.string,
  viewBoxSize: PropTypes.number
}

Icon.defaultProps = {
  size: 24,
  type: 'account',
  unit: 'px',
  viewBoxSize: 24
}

export default Icon;
