import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
const Tabs = props =>{
  const tabListEl = useRef();
  const tabsEl = useRef();
  const [activeTab, setActiveTab] = useState(props.defaultActiveTab)

  useEffect(()=>{
    props.onActiveTabChange&&props.onActiveTabChange(activeTab, [])
  }, [activeTab, props])
  const children = React.Children.toArray(props.children)
  return(
    <div className={`tabs ${props.className}`} style={{position:'relative',...props.style}} ref={tabsEl}>
    {
      children.map(child=>
      React.cloneElement(
        child,
        {animatedTabs:props.animatedTabs, setActiveTab:setActiveTab, activeTab:activeTab, tabListEl:tabListEl, tabsEl:tabsEl}
        )
      )
    }
    </div>
  )
}

Tabs.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  defaultActiveTab:PropTypes.number,
  onActiveTabChange:PropTypes.func,
  animatedTabs:PropTypes.bool
}

Tabs.defaultProps = {
  className:'',
  style:{},
  defaultActiveTab:0,
  onActiveTabChange:()=>true,
  animatedTabs:false
}

export default Tabs
