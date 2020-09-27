import React,{useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

const Tab = props => {
  const handleClick = () => {
    props.setActiveTab(props.index)
    props.onClick&&props.onClick()
  }
  const tabEl=useRef()

  const style=props.style

  const [tabWidth, setTabWidth]=useState()

  useEffect(()=>{
    props.fixedWidth&&setTabWidth(tabEl.current.offsetWidth)
  },[tabEl.current])

  useEffect(()=>{
    if(props.isActive===true){
      props.activeTabEl.current=tabEl.current
    }
  },[props.isActive, tabEl.current])

  const activeClass = () => props.isActive? 'active' : ''
  const Icon = () => <div className={`tab-icon ${activeClass()}`}>{props.icon||props.label[0]}</div>
  return props.children
    ?<span onClick={handleClick}>{props.children}</span>
    :<div
          className={`nav-link tab ${props.className} ${activeClass()}`}
          style={{...style, width:tabWidth}}
          onClick={handleClick}
          ref={tabEl}
      >
        {props.useIcons&&<Icon/>}
          <span className="tab-label">{props.label}</span>
      </div>
}

Tab.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  isActive:PropTypes.bool,
  fixedWidth:PropTypes.bool
}

Tab.defaultProps = {
  className:'',
  style:{},
  fixedWidth:false
}


export default Tab
