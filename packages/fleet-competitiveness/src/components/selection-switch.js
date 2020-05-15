import React from 'react'
import PropTypes from 'prop-types'
import {Switch} from '@reaqtive/layout'
import {QGenericObject} from '@reaqtive/q'

const SelectionSwitch = props => {
  const {selectionValue, qFieldExpr, label} = props
  const qObjectDef={
    qInfo:{qType:'ListObject'},
    qListObjectDef:{
      qDef:{
        "qFieldDefs": [ qFieldExpr ]
      },
      "qInitialDataFetch": [ {qTop:0,qLeft:0,qHeight:30,qWidth:1} ],
    }
  }
  return(
    <QGenericObject qObjectDef={qObjectDef}>
      {(qGenericObject)=>{
        const qLayout = qGenericObject.qLayoutHandler.qLayout
        const qObject = qGenericObject.qObjectHandler.qObject
        const isOnRecord = qLayout&&qLayout.qListObject.qDataPages[0].qMatrix.filter(record=>record[0].qNum===selectionValue||record[0].qText===selectionValue)[0][0]
        const isOn = isOnRecord&&isOnRecord.qState==='S'?true:false
        return(
          <Switch
            label={label}
            isOn={isOn}
            onChange={()=>qObject.selectListObjectValues('/qListObjectDef',[isOnRecord&&isOnRecord.qElemNumber], true)}
          />
        )
      }
      }
    </QGenericObject>
  )
}

export default SelectionSwitch

SelectionSwitch.propTypes = {
  qFieldExpr:PropTypes.string.isRequired,
  selectionValue:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label:PropTypes.string
}

SelectionSwitch.defaultProps = {
  selectionValue:1,
  label:'My Selection Switch'
}
