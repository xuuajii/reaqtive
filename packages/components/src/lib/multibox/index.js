//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import  {Accordion, Collapse, CollapseHeader, CollapseBody} from '@reaqtive/layout'
import  {RqtvListbox} from '../index'


const RqtvMultibox = props => {
  // console.log(props.fieldList)

  return(
    <Accordion className="rqtv-multibox" style={{width:props.width}}>
      {props.fieldList.map(field=>
        {
          const fieldExpr =((typeof field)==='string')?field:field.qFieldExpr
          // console.log(fieldExpr)
          return(
          <Collapse key={fieldExpr}>
            <CollapseHeader
              hideTitleWhenExpanded={true}
            >
              {field.hasSelections===true&&<span className="selection-indicator"/>}
              {field.label||fieldExpr}
            </CollapseHeader>
            <CollapseBody height={props.fieldHeight}>
              <RqtvListbox
                height={props.fieldHeight}
                qFieldExpr={fieldExpr}
                qLabelExpr={`'${field.label||fieldExpr}'`}
              />
            </CollapseBody>
          </Collapse>
        )}
      )}
    </Accordion>
  )
}

RqtvMultibox.propsTypes = {
  fields:PropTypes.array.isRequired,
  fieldHeight:PropTypes.integer
}

RqtvMultibox.defaultProps = {
  fieldHeight:300
}

export default RqtvMultibox
