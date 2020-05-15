import React from 'react'
import PropTypes from 'prop-types'
import {RqtvNoData, RqtvSpinner, RqtvError} from './rqtv-renderer-views';


const RqtvRenderer = props => {
  const loadingComponent =
    props.customLoading
    ?props.customLoading
    :<RqtvSpinner isFixed={props.isFixed}/>
  const errorComponent =
    props.customError
    ?props.customError
    :<RqtvError reload = {props.reload} isFixed={props.isFixed}/>
  const noDataComponent =
    props.customNoData
    ?props.customNoData
    :<RqtvNoData isFixed={props.isFixed}/>
    //console.log(props)
  return(
     props.loading===true
     ?loadingComponent
     :
     props.error===true
     ?errorComponent
     :
     props.noData===true
     ?noDataComponent
     :
     props.children
   )
}

RqtvRenderer.propTypes={
  loading:PropTypes.bool.isRequired,
  error:PropTypes.bool.isRequired,
  noData:PropTypes.bool,
  customLoading:PropTypes.element,
  customError:PropTypes.element,
  customNoData:PropTypes.element,
  isFixed:PropTypes.bool
}
RqtvRenderer.defaultProps={
  isFixed:false
}

export default RqtvRenderer
