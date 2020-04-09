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

/**
 * RqtvSearchObject
 *
 * It dispays a search object to search a single string in multiple fields.
 *
 * If rendered inside the rqtv-navbar it will have fixed position and search results will colver the underlying page
 *
 */

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
          show&&
          <div className={`rqtv-search-animated-container ${show&&'show'}`} ref={searchContainerEl}>
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
  /**
   * If true the search input will always be displayed
   *
   */
  alwaysExpanded:PropTypes.bool,
  /**
   * The direction from which the input will expand if not always expanded
   *
   */
  expandFrom:PropTypes.oneOf(['right', 'left']),
  /**
   * width of the component. It accept px or %
   *
   */
  width:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  /**
   * function fired after showing the search input. (not called if alwaysExpanded is true)
   *
   */
  onOpen:PropTypes.func,
  /**
   * function fired after hiding the search input. (not called if alwaysExpanded is true)
   *
   */
  onClose:PropTypes.func,
  /**
   * the fields of the data model to search against
   *
   */
  searchFields:PropTypes.array,
}

RqtvSearchObject.defaultProps = {
  alwaysExpanded:false,
  expandFrom:'left',
  width:'100%'
}

export default RqtvSearchObject
