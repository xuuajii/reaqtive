//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {useSpring, animated} from 'react-spring'
import RqtvSearch from './rqtv-search'
import {Button} from '@reaqtive/layout'
import {LuiIcon} from '@reaqtive/layout'
import {Backdrop} from '@reaqtive/layout'

const RqtvSearchObject = props =>{
  const {alwaysExpanded, expandFrom, width, ...rest} = props ;
  const [show, setShow] = useState(false)
  const showSearch = () => {
    setShow(true)
    if(typeof props.onOpen==='function'){
      props.onOpen()
    }
  }

  const hideSearch = () => {
    setShow(false)
    typeof props.onClose==='function'&&props.onClose()
  }

  const searchContainerEl = useRef()
  const isFixed = () => searchContainerEl.current&&window.getComputedStyle(searchContainerEl.current).position==='fixed'
  useEffect(()=>{
    isFixed()&&show?document.documentElement.style.overflow = "hidden":document.documentElement.style.overflow = "auto";
  },[show])

  return (
    <div className="rqtv-search" style={{flexDirection:expandFrom==='right'?'row-reverse':'row'}}>
    {
      props.alwaysExpanded===true
      ?<RqtvSearch {...props} />
      :<>
        {!show&&
          <Button className="rqtv-search-toggler" onClick={showSearch} {...props}>
            <LuiIcon iconType={'search'}/>
          </Button>}
        {
          show&&<div className={`rqtv-search-animated-container ${show&&'show'}`} ref={searchContainerEl}>
            <div className="backdrop-search" onClick={hideSearch}></div>
            <RqtvSearch {...props} hideSearch={hideSearch} show={show}/>
          </div>
        }
      </>
    }
    </div>
  )
}

RqtvSearchObject.propTypes = {
  alwaysExpanded:PropTypes.bool,
  expandFrom:PropTypes.oneOf(['right', 'left']),
  width:PropTypes.number,
  onOpen:PropTypes.func,
  onClose:PropTypes.func,
}

RqtvSearchObject.defaultProps = {
  alwaysExpanded:false,
  expandFrom:'left',
}

export default RqtvSearchObject
