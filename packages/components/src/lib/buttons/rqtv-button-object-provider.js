//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Button} from '@reaqtive/layout'
import {RqtvAppContext} from '../contexts/rqtv-app-context'
import {LuiIcon} from '@reaqtive/layout'
import {QComponent} from '@reaqtive/q'

const RqtvButtonObjectProvider = props => {
  const appContext = useContext(RqtvAppContext);
  const ripple=appContext&&appContext.theme&&appContext.theme.ripple?'ripple':props.ripple;
  const qButtonDef = useMemo(()=>{return(
    {
      "qInfo": { "qType": "LayoutExpressions" },
      "label":{
        qStringExpression:{
          qExpr:props.qLabelExpr
        }
      },
      "color":{
        qStringExpression:{
          qExpr:props.qColorExpr
        }
      },
    })
  }, [props.qLabelExpr, props.qColorExpr])
  const layoutProps = {
    className:props.className?props.className:'',
    onClick:props.onClick,
    label:props.label,
    ripple:ripple,
    style:{...props.style},
    showCaret:props.showCaret,
  }
  const children = React.Children.toArray(props.children)
  return(
    (props.qLabelExpr||props.qColorExpr)
    ?<QComponent qObjectDef={qButtonDef}>
      {children.map(child=>React.cloneElement(child, {...layoutProps}))}
    </QComponent>
    :children.map(child=>React.cloneElement(child, {...layoutProps}))

  )
}

export default RqtvButtonObjectProvider
