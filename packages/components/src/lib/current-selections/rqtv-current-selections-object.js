//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import {QDoc} from '@reaqtive/q'
//import withQComponent from './with-q-component'


const RqtvCurrentSelectionsObject = (props) => {
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler.qDoc
  //qSelectionsCount={qSelectionObject&&qSelectionObject.qSelections.length}
  const qLayout = props.qLayoutHandler.qLayout
  const qSelectionObject = qLayout&&qLayout.qSelectionObject
  const rqtvCurrentSelectionsObject={
    qSelectionsCount:qSelectionObject&&Array.isArray(qSelectionObject.qSelections)?qSelectionObject.qSelections.length:0,
    qBackCount:qSelectionObject&&qSelectionObject.qBackCount,
    qForwardCount:qSelectionObject&&qSelectionObject.qForwardCount,
    clearAll: () => {
      qDoc.clearAll().then(qResult=>props.onClear).catch(qErr=>console.log('error clearing selections',qErr))
    },
    back: () => {
      qDoc.back().then(qResult=>props.onBack).catch(qErr=>console.log('error clearing selections',qErr))
    },
    forward: () => {
      qDoc.forward().then(qResult=>props.onForward).catch(qErr=>console.log('error clearing selections',qErr))
    }
  }
  return(
    //props.layout(props, rqtvCurrentSelectionsObject)
    React.cloneElement(props.children, {...props, rqtvCurrentSelectionsObject})
  )
}

//const RqtvCurrentSelectionsObjectWithQ = withQComponent(RqtvCurrentSelectionsObject)
export default RqtvCurrentSelectionsObject
