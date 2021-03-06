import React, {useState, useEffect, useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, useLocation } from 'react-router-dom'
import {RqtvPageContext, RqtvPageProvider} from '../contexts/rqtv-page-context'
import {useQObjectReducer, useQLayoutReducer } from '@reaqtive/q'

const useQConditionDef = (qConditionExpr) => useMemo(()=>{
  return {
    qInfo: {
      qType: "page-condition",
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr||''
      }
    }
  }
}, [qConditionExpr])

/**
 * RqtvPage
 *
 * It is a container based on the Route component of the React Router. It can't be used outside RqtvApp.
 * It is a dummy component which provides a the RqtvPageContext and a QGenericObject with 2 experessions:
 * qTitleExpr --> providing the qTitle result
 * qConditionExpr --> providing the qCondition result
 * When navigating among RqtvPages you can use query strings to select values in fields. Here an example of a query string: ?selections=Customer:Benedict;Zocalo&selections=Account:61099 . Place your query string at the end of the url you are navigating to.
 * RqtvPage also accept triggers which are fired when the page mounts.
 * Like Routes RqtvPages can be nested. RqtvPage does not unMount when the route change, to force unmount add a key prop (it has to be unique among pages).
 *
 *
 */

const RqtvPage = props => {
  const {fallbackPage} = props

  return(
    <Route path={props.path} exact={props.exact}>
      <RqtvPageProvider
          triggers={props.triggers}
          qConditionExpr={props.qConditionExpr}
          qTitleExpr={props.qTitleExpr}
          hasQueryString={location.search!==""?true:false}
        >
          <RqtvPageConsumer
            fallbackPage={fallbackPage}
            loadingComponent={props.loadingComponent}
          >
            {props.children}
          </RqtvPageConsumer>
      </RqtvPageProvider>
    </Route>
  )
}

const RqtvPageConsumer = props => {
  const location = useLocation()
  const rqtvPageContext=useContext(RqtvPageContext)
  const {fallbackPage}=props
  const {triggerState, qCondition, qPageObjectHandler, qTitle}=rqtvPageContext&&rqtvPageContext
  const [triggersDone, setTriggersDone] = useState()
  useEffect(()=>{
    setTriggersDone(triggerState.done)
    return ()=>setTriggersDone(false)
  },[triggerState.done])


  // useEffect(()=>{
  //   qPageObjectHandler.set
  // }, [location.pathname])

  if( qCondition==='0' && fallbackPage && triggersDone===true){
    return <Redirect to={fallbackPage?fallbackPage:""} />
  }
  if(triggersDone===true){
    return  props.children
  }else{
    return props.loadingComponent?props.loadingComponent:<></>
  }
}

RqtvPage.propTypes = {
  /**
   * the path to reach the page. See React Router for details
   *
   */
  path:PropTypes.string.isRequired,
  /**
   * the name of the page displayed in the side-menu of the app. If not set it will be equal to the path, replacing '-' with  ' '
   *
   */
  linkName:PropTypes.string,
  /**
   * triggers fired when the page is mounted see @reaqtive/q docs for details
   *
   */
  triggers:PropTypes.array.isRequired,
  /**
   * the expression that can be used to make the title dynamic as in Qlik Sense sheets
   *
   */
  qTitleExpr:PropTypes.string,
  /**
   * a qlik espression that returns a value, used in combination with the fallback page prop, it redirects when false
   *
   */
  qConditionExpr:PropTypes.string,
  /**
   * the page the user is redicrected to when the qConditionExpr returns false (0)
   *
   */
  fallbackPage:PropTypes.string,
  /**
   * shows the route only if the path match exactly with the addressbar. See the React Router docs for details
   *
   */
  exact:PropTypes.bool,
  /**
   * the component displayed while triggers fired
   *
   */
  loadingComponent:PropTypes.element
}

RqtvPage.defaultProps = {
  exact:false,
  triggers:[],
  qConditionExpr:"",
  qTitleExpr:"'My Reaqtive Page'"
}

export default RqtvPage
