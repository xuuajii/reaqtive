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
import { HashRouter  as Router, Switch } from "react-router-dom";

const RqtvApp = props =>{
  const {qCapabilityApiRequired, children, triggers, ...rqtvAppProps} = props
  const triggerState = useTriggers(props.triggers)

  const isRqtvPage = (child) => child//.type&&child.type.name==='RqtvPage'
  const [pages , setPages] = useState(children)
  useEffect(()=>{
    const filteredPages = React.Children.toArray(props.children)//.filter(isRqtvPage)
    const extractPageInfo = page => {
      const { title, path, id, icon, exactActiveMatch } = page.props;
      return { title, path, id, icon, exactActiveMatch }
    }
    setPages(filteredPages.map(page=>extractPageInfo(page)))
  },[props.children])
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
