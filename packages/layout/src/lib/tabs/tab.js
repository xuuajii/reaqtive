import React from 'react'
import PropTypes from 'prop-types'

const Tab = props => {
  const handleClick = () => {
    props.setActiveTab(props.index)
    props.onClick&&props.onClick()
  }
  const activeTabEl=props.isActive?props.activeTabEl:null

  const style={
    ...props.style
  }
  const activeClass = () => props.isActive? 'active' : ''
  const Icon = () => <div className={`tab-icon ${activeClass()}`}>{props.icon||props.label[0]}</div>
  return props.children
    ?<span onClick={handleClick}>{props.children}</span>
    :<div
          className={`nav-link tab ${props.className} ${activeClass()}`}
          style={{...style}}
          onClick={handleClick}
          ref={activeTabEl}
      >
        {props.useIcons&&<Icon/>}
          <span className="tab-label">{props.label}</span>
      </div>
}

Tab.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
}

Tab.defaultProps = {
  className:'',
  style:{},
}


export default Tab
