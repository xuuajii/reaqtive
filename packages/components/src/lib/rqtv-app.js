//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { HashRouter as Router, Switch } from 'react-router-dom'
import {QDocProvider, QAppProvider, useTriggers} from '@reaqtive/q'
import {RqtvAppContextProvider} from './contexts/rqtv-app-context'
import {RqtvAppRenderer} from './loading/index'
import {triggerType} from './custom-prop-types/index.js'

/**
 * RqtvApp
 *
 * It provides routing using react router and a context that allows you to store
 * app info to be available everywhere inside your app.
 *
 */

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
  /**
   * triggers to fire when opening the app (do not abuse triggers)
   *
   */
  triggers:triggerType,
  /**
   * the title of the app displayed in the navbar
   *
   */
  title:PropTypes.string,
  /**
   * the brand of the app displayed in the navbar. An image is expected: import it in the app and pass it as a prop
   *
   */
  brand:PropTypes.string,
  /**
   * the url to redirect to when clicking on the brand
   *
   */
  brandUrl:PropTypes.string,
  /**
   * styles to be applied to the image container
   *
   */
  brandStyle:PropTypes.object,
  /**
   * if true the applicatin will be wrapped in react router and in a switch
   *
   */
  useRouter:PropTypes.bool,
  /**
   * fields to be displayed in the side menu. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
   *
   */
  sideMenuFieldsMatch:PropTypes.shape({
    method:PropTypes.oneOf(['include', 'exclude']),
    mask:PropTypes.arrayOf(PropTypes.string)
  }),
  useRouter:PropTypes.bool,
  /**
   * fields to be used in the search object in the navbar. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
   *
   */
  searchFieldMatch:PropTypes.shape({
    method:PropTypes.oneOf(['include', 'exclude']),
    mask:PropTypes.arrayOf(PropTypes.string)
  }),
  /**
   * Prefix to hide a field in current selections modal. Hidden fields will be considered in selectins count and in back, forward actions
   *
   */
  hidePrefix:'%',
}

RqtvApp.defaultProps={
  triggers:[],
  useRouter:true,
  hidePrefix:'%',
  sideMenuFieldsMatch:{method:'include', mask:['**']},
  searchFieldMatch:{method:'include', mask:['**']}
}

export default RqtvApp
