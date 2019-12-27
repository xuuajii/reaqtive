//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {QComponent} from '@reaqtive/q'
import RqtvCurrentSelectionsObject from './rqtv-current-selections-object'
import Layout from './layout'

const qCurrentSelectionsObjectDef = {
  "qInfo": {
    "qId": "",
    "qType": "SessionLists"
  },
  "qSelectionObjectDef": {} ,
	qSelections: null,
	qFields: null
}

const RqtvCurrentSelections = (props) => {
  return(
    <div className="rqtv-current-selections" hidden={props.hidden}>
      <QComponent qObjectDef={qCurrentSelectionsObjectDef}>
        <RqtvCurrentSelectionsObject>
              <Layout
                isResponsive={props.isResponsive}
                showModalToggler={props.showModalToggler}
                useCurrentSelectionModal={props.useCurrentSelectionModal}
                hidePrefix={props.hidePrefix}
                alwayShowToolbar={props.alwayShowToolbar}
                customLoading={props.customLoading}
              />
        </RqtvCurrentSelectionsObject>
      </QComponent>
    </div>
  )
}

RqtvCurrentSelections.propTypes={
  useCurrentSelectionModal:PropTypes.bool,
  isResponsive:PropTypes.bool,
  showModalToggler:PropTypes.bool,
  alwayShowToolbar:PropTypes.bool
}

RqtvCurrentSelections.defaultProps={
  useCurrentSelectionModal:true,
  isResponsive:true,
  showModalToggler:true,
  alwayShowToolbar:false
}

export default RqtvCurrentSelections
