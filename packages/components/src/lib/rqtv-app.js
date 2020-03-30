//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { HashRouter as Router, Switch } from 'react-router-dom'
import {QDocProvider, QAppProvider, useTriggers} from '@reaqtive/q'
import {RqtvAppContextProvider} from './contexts/rqtv-app-context'
import {RqtvAppRenderer} from './loading/index'

const RqtvApp = props =>{
  const {qCapabilityApiRequired, children, triggers, ...rqtvAppProps} = props
  const triggerState = useTriggers(props.triggers)

  const isRqtvPage = (child) => child//.type&&child.type.name==='RqtvPage'
  const [pages , setPages] = useState(children)
  useEffect(()=>{
    const sortedPages = React.Children.toArray(props.children)
    .sort((a,b)=>{
      const pageA = a
      const pageB = b
      return pageA.props.path === '/' ? -1 : pageB.props.path === '/' ? 1 : 0
    })//.filter(isRqtvPage)
    const extractPageInfo = page => {
      const { linkName, path, icon, exactActiveMatch } = page.props;
      const key = page.key
      return { linkName:linkName?linkName:path.replace(/-/g, ' ').replace(/\//,'') , path, key, icon, exactActiveMatch}
    }
    setPages(sortedPages.map(page=>extractPageInfo(page)))
  },[])
  useEffect(()=>{
    document.title=props.title
  },[props.title])
  return(
    <Router>
      <RqtvAppContextProvider {...rqtvAppProps} pages={pages}>
        <RqtvAppRenderer qCapabilityApiRequired={qCapabilityApiRequired} triggersDone={triggerState.qLoading===false}>
          {  props.children.length && props.useRouter===true?
            <Switch>
              {props.children}
            </Switch>
            :props.children
          }
        </RqtvAppRenderer>
      </RqtvAppContextProvider>
    </Router>
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
  title:PropTypes.string,
  useRouter:PropTypes.bool
}

RqtvApp.defaultProps={
  triggers:[],
  title:'Reaqtive App',
  useRouter:true
}

export default RqtvApp
