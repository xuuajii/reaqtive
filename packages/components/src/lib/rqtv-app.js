//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {QDocProvider} from '@reaqtive/q'
import {QAppProvider} from '@reaqtive/q'
import {useTriggers} from '@reaqtive/q'
import {RqtvAppContextProvider} from './contexts/rqtv-app-context'
import {RqtvAppRenderer} from './loading/index'

const RqtvApp = props =>{
  const {qCapabilityApiRequired, children, triggers, ...rqtvAppProps} = props
  const triggerState = useTriggers(props.triggers)

  const isRqtvPage = (child) => child//.type&&child.type.name==='RqtvPage'
  const [pages , setPages] = useState(children)
  useEffect(()=>{
    const filteredPages = React.Children.toArray(props.children.props.children)//.filter(isRqtvPage)
    const extractPageInfo = page => {
      const { linkName, path, icon, exactActiveMatch } = page.props;
      const key = page.key
      return { linkName:linkName?linkName:path.replace(/-/g, ' ').replace(/\//,''), path, key, icon, exactActiveMatch }
    }
    setPages(filteredPages.map(page=>extractPageInfo(page)))
  },[props.children])
  useEffect(()=>{
    document.title=props.title
  },[props.title])
  return(
    <RqtvAppContextProvider {...rqtvAppProps} pages={pages}>
      <RqtvAppRenderer qCapabilityApiRequired={qCapabilityApiRequired} triggersDone={triggerState.qLoading===false}>
        {props.children}
      </RqtvAppRenderer>
    </RqtvAppContextProvider>
  )
}

RqtvApp.propTypes={
  triggers:PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.shape({
      type:PropTypes.string,
      params:PropTypes.object
    }))
  ]),
  title:PropTypes.string
}

RqtvApp.defaultProps={
  triggers:[],
  title:'Reaqtive App'
}

export default RqtvApp
