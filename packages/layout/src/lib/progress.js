
import React from 'react'
import PropTypes from 'prop-types'

const Progress = props =>
<div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
  <div className={`progress ${props.className||''}`} style={{ width:props.width+'%',height: props.height, ...props.style}}>
      <div className="progress-bar" role="progressbar" style={{width: props.value+'%'}}></div>
  </div>
</div>

Progress.propTypes = {
  height:PropTypes.number,
  value:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width:PropTypes.number
}

Progress.defaultProps = {
  height:1,
  value:0,
  width:50
}

export default Progress
